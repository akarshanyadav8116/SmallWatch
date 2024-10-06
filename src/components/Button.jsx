const Button = ({item,onButtonClick}) => {
    // console.log("onButtonClick: ",onButtonClick);
    return (
    <div>
        <div><button className="px-8 py-1 rounded-xl text-xl font-normal hover:bg-white hover:text-black focus:bg-white focus:text-black focus:ring focus:ring-cyan-700 ..." 
        onClick={() => onButtonClick(item)}
        >{item}</button></div>
    </div>
    );
};

export default Button;
