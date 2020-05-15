export default function ItemBox({
  id,
  slug,
  name,
  price,
  description,
  image,
  alt,
  noDescription
}) {
  return (
    <a href={`/item/${slug}`}>
      <img className="mb-2" src={image} alt={alt} />
      <h2 className="text-2xl font-bold text-left">{name}</h2>
      <h3 className="text-xl font-bold text-left">
        {
          (new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }))
            .format(price / 100)
        }
      </h3>
      {
        !noDescription && (
          <p className="text-justify">
            {description.length > 200 ? (description.substring(0, 197).concat('...')) : description}
          </p>
        )
      }

    </a>
  )
}