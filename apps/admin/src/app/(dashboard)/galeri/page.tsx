'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { Trash2, Upload, ImagePlus, Loader2, Pencil, X, Star } from 'lucide-react'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { createClient } from '@/lib/supabase/client'
import type { GalleryImage } from '@/types'
import { cn } from '@/lib/utils'

export default function GaleriPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [editForm, setEditForm] = useState({ alt_text: '', caption: '', is_featured: false })
  const [saving, setSaving] = useState(false)
  const supabase = useRef(createClient()).current

  const loadImages = useCallback(async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order')
    if (data) setImages(data as GalleryImage[])
    setLoading(false)
  }, [supabase])

  useEffect(() => { loadImages() }, [loadImages])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)
    for (const file of acceptedFiles) {
      const ext = file.name.split('.').pop()
      const filePath = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('pawonloka')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })
      if (uploadError) { alert('Gagal upload: ' + uploadError.message); continue }
      const { data: { publicUrl } } = supabase.storage.from('pawonloka').getPublicUrl(filePath)
      await supabase.from('gallery_images').insert({
        url: publicUrl,
        alt_text: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        display_order: images.length + 1,
        is_featured: false,
      })
    }
    await loadImages()
    setUploading(false)
  }, [images.length, supabase, loadImages])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024,
    disabled: uploading,
  })

  const openEdit = (image: GalleryImage) => {
    setEditingImage(image)
    setEditForm({
      alt_text: image.alt_text ?? '',
      caption: image.caption ?? '',
      is_featured: image.is_featured,
    })
  }

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingImage) return
    setSaving(true)
    const { error } = await supabase.from('gallery_images').update({
      alt_text: editForm.alt_text || null,
      caption: editForm.caption || null,
      is_featured: editForm.is_featured,
    }).eq('id', editingImage.id)
    if (error) {
      alert('Gagal menyimpan: ' + error.message)
      setSaving(false)
      return
    }
    await loadImages()
    setEditingImage(null)
    setSaving(false)
  }

  const handleDelete = async (image: GalleryImage) => {
    if (!confirm('Hapus foto ini?')) return
    const path = image.url.split('/storage/v1/object/public/pawonloka/')[1]
    if (path) await supabase.storage.from('pawonloka').remove([path])
    await supabase.from('gallery_images').delete().eq('id', image.id)
    setImages((prev) => prev.filter((img) => img.id !== image.id))
  }

  const toggleFeatured = async (image: GalleryImage) => {
    await supabase.from('gallery_images').update({ is_featured: !image.is_featured }).eq('id', image.id)
    setImages(prev => prev.map(img => img.id === image.id ? { ...img, is_featured: !img.is_featured } : img))
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
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            {uploading ? (
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            ) : (
              <Upload className="w-10 h-10 text-muted-foreground" />
            )}
            <div>
              <p className="font-medium text-foreground">
                {uploading ? 'Mengupload...' : isDragActive ? 'Lepaskan file di sini' : 'Drag & drop foto di sini'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">atau klik untuk memilih (JPG, PNG, WEBP · Maks 10MB)</p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center text-muted-foreground py-12">Memuat galeri...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 admin-card">
            <ImagePlus className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Belum ada foto. Upload foto pertama Anda!</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{images.length} foto</p>
              <p className="text-xs text-muted-foreground">⭐ = tampil di bagian &quot;Preview Galeri&quot; di beranda website (maks 6)</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((image) => (
                <div key={image.id} className="group relative aspect-square rounded-xl overflow-hidden bg-muted border border-border">
                  <img
                    src={image.url}
                    alt={image.alt_text ?? 'Gallery image'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Featured badge */}
                  {image.is_featured && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded">FEATURED</span>
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEdit(image)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white text-foreground rounded-lg hover:bg-gray-100 cursor-pointer"
                      aria-label="Edit foto"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleFeatured(image)}
                      className={cn(
                        'opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg cursor-pointer',
                        image.is_featured ? 'bg-primary text-white hover:bg-primary/80' : 'bg-white text-foreground hover:bg-gray-100'
                      )}
                      aria-label={image.is_featured ? 'Hapus dari featured' : 'Jadikan featured'}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(image)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                      aria-label="Hapus foto"
                    >
                      <Trash2 className="w-4 h-4" />
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

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Edit Foto</h2>
              <button onClick={() => setEditingImage(null)} className="p-1.5 rounded-lg hover:bg-muted cursor-pointer text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSave} className="p-6 space-y-4">
              {/* Preview */}
              <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                <img src={editingImage.url} alt="Preview" className="w-full h-full object-cover" />
              </div>

              <div>
                <label className="form-label">Nama / Alt Text</label>
                <input
                  type="text"
                  value={editForm.alt_text}
                  onChange={(e) => setEditForm(f => ({ ...f, alt_text: e.target.value }))}
                  className="form-input"
                  placeholder="Ayam Bakar PawonLoka"
                />
              </div>
              <div>
                <label className="form-label">Keterangan (Caption)</label>
                <input
                  type="text"
                  value={editForm.caption}
                  onChange={(e) => setEditForm(f => ({ ...f, caption: e.target.value }))}
                  className="form-input"
                  placeholder="Ayam bakar bumbu rempah pilihan"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editForm.is_featured}
                  onChange={(e) => setEditForm(f => ({ ...f, is_featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-input text-primary cursor-pointer"
                />
                <span className="text-sm text-foreground font-medium">Tampil di Preview Galeri beranda website</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditingImage(null)} className="btn-secondary flex-1">Batal</button>
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
