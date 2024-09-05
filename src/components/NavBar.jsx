import Button from "./Button";

const NavBar = ({onButtonClick}) => {
  // console.log("onButtonClick: ",onButtonClick);
  return (<div>
    <div className="lg:flex md:flex sm:grid justify-evenly items-center">
        <Button item="Clock" onButtonClick={onButtonClick}/>
        <Button item="Alarm" onButtonClick={onButtonClick}/>
        <Button item="Timer" onButtonClick = {onButtonClick}/>
        <Button item="Stopwatch" onButtonClick = {onButtonClick}/>
        <Button item="Calendar" onButtonClick = {onButtonClick}/>
    </div>
    
  </div>);
};

export default NavBar;
