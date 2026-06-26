export default function YouTube({ id }) {
  return (
    <div className="my-8 not-prose rounded-xl overflow-hidden border border-gray-200 shadow-sm aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    </div>
  )
}
