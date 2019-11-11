import React, {Component} from 'react';

let dialogStyles={
	width:"500px",
	maxWidth:"100%",
	margin:"0 auto",
	position:"fixed",
	left:"50%",
	top:"50%",
	transform:"translate(-50%,-50%)",
	zIndex:"999",
	backgroundColor:"#eee",
	padding:"10px 20px 40px",
	borderRadius:"8px",
	display:"flex",
	flexDirection:"column"
};{/*refers to the dialog that pops up*/}


let dialogCloseButtonStyles={
marginBottom:"15px",
padding:"3px 8px",
borderRadius:"50%",
border:"none",
width:"30px",
height:"30px",
fontWeight:"bold",
alignSelf:"flex-end"
};{/*refers to the close button on the dialog*/}

class Dialog extends Component{
render(){
	let dialog=(
		<div style={dialogStyles}>{/*dialogStyles is being called(refers to the css for the dialogbox)*/}
			<button style={dialogCloseButtonStyles} onClick={this.props.onClose}>x</button>{/*dialogCloseButtonStyles is being called(refers to the close button on the dialog)*/}
			<div>{this.props.children}</div>{/*refers to everything under the <dialog> in App.js, that text will be displayed here*/}
		</div>
		);
		if(! this.props.isOpen){
			dialog=null;
		}
		return(
		<div>
		{dialog}

		</div>

		);
}

}

export default Dialog;