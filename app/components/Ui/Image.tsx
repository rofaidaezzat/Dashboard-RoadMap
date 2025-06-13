interface Iprops{
    imageurl:string;
    alt:string;
    className?:string;
}

const Image = ({imageurl,alt,className}:Iprops) => {
    return (
        <img src={imageurl} alt={alt} className={className}/>
)
}

export default Image