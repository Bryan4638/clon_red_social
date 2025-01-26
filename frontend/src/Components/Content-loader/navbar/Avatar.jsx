import ContentLoader from "react-content-loader"

const Avatar = (props) => (
  <ContentLoader 
    speed={2}
    width={200}
    height={44}
    viewBox="0 0 188 44"
    backgroundColor="#575757"
    foregroundColor="#7a7a7a"
    {...props}
  >
    <circle cx="27" cy="22" r="15" /> 
    <rect x="47" y="11" rx="12" ry="12" width="63" height="21" /> 
    <circle cx="129" cy="22" r="15" /> 
    <circle cx="162" cy="22" r="15" />
  </ContentLoader>
)

export default Avatar

