'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { Trash2, Upload, ImagePlus, Loader2 } from 'lucide-react'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { createClient } from '@/lib/supabase/client'
import type { GalleryImage } from '@/types'
import { cn } from '@/lib/utils'

export default function GaleriPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const supabase = useRef(createClient()).current

  const loadImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order')
    if (data) setImages(data as GalleryImage[])
    setLoading(false)
  }

  useEffect(() => { loadImages() }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    for (const file of acceptedFiles) {
      const fileExt = file.name.split('.').pop()
      const filePath = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pawonloka')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })

      if (uploadError) { console.error(uploadError); continue }

      const { data: { publicUrl } } = supabase.storage
        .from('pawonloka')
        .getPublicUrl(filePath)

      await supabase.from('gallery_images').insert({
        url: publicUrl,
        alt_text: file.name.replace(/\.[^/.]+$/, ''),
        display_order: images.length + 1,
        is_featured: false,
      })
    }
    await loadImages()
    setUploading(false)
  }, [images.length])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024,
    disabled: uploading,
  })

  const handleDelete = async (image: GalleryImage) => {
    if (!confirm('Hapus foto ini?')) return
    const path = image.url.split('/storage/v1/object/public/pawonloka/')[1]
    if (path) await supabase.storage.from('pawonloka').remove([path])
    await supabase.from('gallery_images').delete().eq('id', image.id)
    setImages((prev) => prev.filter((img) => img.id !== image.id))
  }

  return (
    <>
      <AdminHeader title="Manajemen Galeri" subtitle="Upload dan kelola foto galeri website" />
      <main className="flex-1 overflow-y-auto p-6">
        {/* Upload Zone */}
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-2xl p-10 text-center mb-6 transition-all cursor-pointer',
            isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-muted/30',
            uploading && 'opacity-50 cursor-not-allowed'
          )}
          aria-label="Area upload foto"
        >
          <input {...getInputProps()} aria-label="Input upload foto" />
          <div className="flex flex-col items-center gap-3">
            {uploading ? (
              <Loader2 className="w-10 h-10 text-primary animate-spin" aria-hidden="true" />
            ) : (
              <Upload className="w-10 h-10 text-muted-foreground" aria-hidden="true" />
            )}
            <div>
              <p className="font-medium text-foreground">
                {uploading ? 'Mengupload...' : isDragActive ? 'Lepaskan file di sini' : 'Drag & drop foto di sini'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                atau klik untuk memilih file (JPG, PNG, WEBP · Maks 10MB)
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center text-muted-foreground py-12">Memuat galeri...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 admin-card">
            <ImagePlus className="w-12 h-12 text-muted-foreground mx-auto mb-3" aria-hidden="true" />
            <p className="text-muted-foreground">Belum ada foto. Upload foto pertama Anda!</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">{images.length} foto</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((image) => (
                <div key={image.id} className="group relative aspect-square rounded-xl overflow-hidden bg-muted border border-border">
                  <img
                    src={image.url}
                    alt={image.alt_text ?? 'Gallery image'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(image)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                      aria-label={`Hapus foto ${image.alt_text ?? ''}`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                  {image.alt_text && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-white text-[10px] truncate">{image.alt_text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  )
}
