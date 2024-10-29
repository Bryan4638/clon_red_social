import ContentLoader from "react-content-loader"

const Search = (props) => (
  <ContentLoader 
    speed={2}
    width={350}
    height={56}
    viewBox="0 0 350 56"
    backgroundColor="#575757"
    foregroundColor="#7a7a7a"
    {...props}
  >
    <rect x="80" y="14" rx="15" ry="15" width="229" height="28" /> 
    <circle cx="51" cy="28" r="20" />
  </ContentLoader>
)

export default Search

