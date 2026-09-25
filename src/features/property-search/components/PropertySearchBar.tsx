export function PropertySearchBar() {
  return <form action="/property-search" method="get" className="search-bar search-entry" role="search" aria-label="Open MLS property search">
    <label htmlFor="property-search-entry"><span>Where would you like to explore?</span>
      <input id="property-search-entry" placeholder="City, neighborhood or address" aria-describedby="property-search-help" />
    </label>
    <button type="submit" className="button">Explore properties <span aria-hidden="true">↗</span></button>
  </form>;
}
