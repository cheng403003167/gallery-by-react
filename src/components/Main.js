require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

let imageDatas = require('../data/imageDatas.json');

imageDatas = (function getImageURL(imageDatasArr){
  for(var i=0,j=imageDatasArr.length;i<j;i++){
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/'+singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

class ImgFigure extends React.Component {
  render(){
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
}

class AppComponent extends React.Component {
  Constant={
    centerPos:{
      left:0,
      right:0
    },
    hPosRange:{
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosRange:{
      x:[0,0],
      topY:[0,0]
    }
  };
  // rearrange(centerIndex){

  // };
  getInitialStage(){
    // return {
    //   imgsArrangeArr:[
    //     {
          
    //     }
    //   ]
    // }
  }
  componentDidMount(){
    var stageDOM = this.refs.stage,
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW/2),
        halfStageH = Math.ceil(stageH/2);

        var imgFigureDOM = this.refs.imgFigure0,
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW/2),
            halfImgH = Math.ceil(imgH/2);

        this.Constant.centerpos = {
          left:halfStageW-halfImgW,
          top:halfStageH-halfImgH
        }
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW-halfImgW*3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW-halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW-halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH-halfImgH;
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH-halfImgH*3;
        this.Constant.vPosRange.x[0] = halfImgW-imgW;
        this.Constant.vPosRange.x[1] = halfImgW;
        // this.rearrange(0);
  }
  render() {
    var controllerUnits = [],
        imgFigures = [];
    imageDatas.forEach(function(value,index){
      // if(!this.state.imgsArrangeArr[index]){
      //   this.state.imgsArrangeArr[index] = {
      //     pos:{
      //       left:0,
      //       top:0
      //     }
      //   }
      // }
      imgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index} />);
    }.bind(this));
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
