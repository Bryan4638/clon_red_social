import ContentLoader from "react-content-loader"

const Item = (props) => (
  <ContentLoader 
    speed={2}
    width={540}
    height={42}
    viewBox="0 0 540 42"
    backgroundColor="#575757"
    foregroundColor="#7a7a7a"
    {...props}
  >
    <rect x="6" y="7" rx="8" ry="8" width="96" height="28" /> 
    <rect x="113" y="7" rx="8" ry="8" width="96" height="28" /> 
    <rect x="218" y="7" rx="8" ry="8" width="96" height="28" /> 
    <rect x="322" y="7" rx="8" ry="8" width="96" height="28" /> 
    <rect x="426" y="7" rx="8" ry="8" width="96" height="28" />
  </ContentLoader>
)

export default Item



