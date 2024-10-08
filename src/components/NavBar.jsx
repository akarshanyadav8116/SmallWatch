import Button from "./Button";

const NavBar = ({onButtonClick}) => {
  // console.log("onButtonClick: ",onButtonClick);
  return (<div>
    <div className="flex justify-evenly items-center">
        <Button item="Clock" onButtonClick={onButtonClick}/>
        <Button item="Alarm" onButtonClick={onButtonClick}/>
        <Button item="Timer" onButtonClick = {onButtonClick}/>
        <Button item="Stopwatch" onButtonClick = {onButtonClick}/>
    </div>
    
  </div>);
};

export default NavBar;
