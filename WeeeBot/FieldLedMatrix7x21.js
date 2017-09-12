
import Blockly from "scratch-blocks";

class FieldLedMatrix extends Blockly.Field
{
	constructor(colour, opt_validator){
		super(colour, opt_validator);
		this.addArgType("colour");
		this.CURSOR = 'default';
		this.colours_ = null;
		this.columns_ = 0;
	}

	init(block){
		super.init(block)
		//this.setValue(this.getValue())
    if(null == this.fieldGroup_){
      this.fieldGroup_ = Blockly.utils.createSvgElement("g",{},null);
      Blockly.utils.createSvgElement("rect",{rx:0,ry:0,x:0,y:0,height:12,width:12},
      this.fieldGroup_,this.sourceBlock_.workspace)
    }
  this.updateEditable(),
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_),

	}

	dispose(){
		Blockly.WidgetDiv.hideIfOwner(this);
		super.dispose();
	}

	getValue(){
		return this.colour_;
	}

	setValue(colour){
		if(this.sourceBlock_ && Blockly.Events.isEnabled() && this.colour_ != colour){
			Blockly.Events.fire(new Blockly.Events.BlockChange(
        		this.sourceBlock_, 'field', this.name, this.colour_, colour)
			);
		}
		this.colour_ = colour;
		if(this.sourceBlock_){
			this.sourceBlock_.setColour(colour, colour, colour);
		}
	}

	getText(){
		var colour = this.colour_;
		// Try to use #rgb format if possible, rather than #rrggbb.
		var m = colour.match(/^#(.)\1(.)\2(.)\3$/);
		if (m) {
		  colour = '#' + m[1] + m[2] + m[3];
		}
		return colour;
	}

	getSize(){
		return new goog.math.Size(Blockly.BlockSvg.FIELD_WIDTH, Blockly.BlockSvg.FIELD_HEIGHT);
	}

	showEditor_(){
		Blockly.WidgetDiv.show(this, this.sourceBlock_.RTL, FieldLedMatrix.widgetDispose_);
		var picker = new goog.ui.ColorPicker();
  picker.setSize(FieldLedMatrix.COLS);
  picker.setColors(FieldLedMatrix.COLOURS);

  // Position the palette to line up with the field.
  // Record windowSize and scrollOffset before adding the palette.
  var windowSize = goog.dom.getViewportSize();
  var scrollOffset = goog.style.getViewportPageOffset(document);
  var xy = this.getAbsoluteXY_();
  var borderBBox = this.getScaledBBox_();
  var div = Blockly.WidgetDiv.DIV;
  picker.render(div);
  picker.setSelectedColor(this.getValue());
  // Record paletteSize after adding the palette.
  var paletteSize = goog.style.getSize(picker.getElement());

  // Flip the palette vertically if off the bottom.
  if (xy.y + paletteSize.height + borderBBox.height >=
      windowSize.height + scrollOffset.y) {
    xy.y -= paletteSize.height - 1;
  } else {
    xy.y += borderBBox.height - 1;
  }
  if (this.sourceBlock_.RTL) {
    xy.x += borderBBox.width;
    xy.x -= paletteSize.width;
    // Don't go offscreen left.
    if (xy.x < scrollOffset.x) {
      xy.x = scrollOffset.x;
    }
  } else {
    // Don't go offscreen right.
    if (xy.x > windowSize.width + scrollOffset.x - paletteSize.width) {
      xy.x = windowSize.width + scrollOffset.x - paletteSize.width;
    }
  }
  Blockly.WidgetDiv.position(xy.x, xy.y, windowSize, scrollOffset,
                             this.sourceBlock_.RTL);

  // Configure event handler.
  var thisField = this;
  FieldLedMatrix.changeEventKey_ = goog.events.listen(picker,
      goog.ui.ColorPicker.EventType.CHANGE,
      function(event) {
        var colour = event.target.getSelectedColor() || '#000000';
        Blockly.WidgetDiv.hide();
        if (thisField.sourceBlock_) {
          // Call any validation function, and allow it to override.
          colour = thisField.callValidator(colour);
        }
        if (colour !== null) {
          thisField.setValue(colour);
        }
      });
	}

	static widgetDispose_(){
		if(FieldLedMatrix.changeEventKey_){
			goog.events.unlistenByKey(FieldLedMatrix.changeEventKey_);
		}
		Blockly.Events.setGroup(false);
	}
}

FieldLedMatrix.COLOURS = goog.ui.ColorPicker.SIMPLE_GRID_COLORS;
FieldLedMatrix.COLS = 21;
FieldLedMatrix.ROWS = 7;


//==============================================

/*
Blockly.FieldMatrixColour=function(a,b){
  Blockly.FieldMatrixColour.superClass_.constructor.call(this,a,b);
  this.setText(Blockly.Field.NBSP+Blockly.Field.NBSP+Blockly.Field.NBSP);
  a&&"number"===typeof a&&this.setValue(a)
};
goog.inherits(Blockly.FieldMatrixColour,Blockly.Field);
Blockly.FieldMatrixColour.MATRIX_PIXEL_WIDTH=12;
Blockly.FieldMatrixColour.MATRIX_PIXEL_HEIGHT=12;
Blockly.FieldMatrixColour.prototype.colours_=null;
Blockly.FieldMatrixColour.prototype.columns_=0;
*/
/*
Blockly.FieldMatrixColour.prototype.init=function(){

  this.fieldGroup_||(this.fieldGroup_=Blockly.utils.createSvgElement("g",{"class":"field_matrix_color_pixel"},null),
    this.visible_||(this.fieldGroup_.style.display="none"),
    this.borderRect_=Blockly.utils.createSvgElement("rect",{rx:0,ry:0,x:0,y:0,height:Blockly.FieldMatrixColour.MATRIX_PIXEL_HEIGHT},this.fieldGroup_,this.sourceBlock_.workspace),
    this.textElement_=Blockly.utils.createSvgElement("text",{"class":"blocklyText",y:Blockly.FieldMatrixColour.MATRIX_PIXEL_HEIGHT},
this.fieldGroup_),
  this.updateEditable(),
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_),
  this.mouseUpWrapper_=Blockly.bindEventWithChecks_(this.fieldGroup_,"mouseup",this,this.onMouseUp_),
  this.render_(),
  this.setValue(this.getValue()))
};
Blockly.FieldMatrixColour.prototype.render_=function(){
  if(this.visible_){
    goog.dom.removeChildren(this.textElement_);
    var a=document.createTextNode(this.getDisplayText_());
    this.textElement_.appendChild(a);
    this.borderRect_&&this.borderRect_.setAttribute("width",Blockly.FieldMatrixColour.MATRIX_PIXEL_WIDTH);
    this.size_.width=Blockly.FieldMatrixColour.MATRIX_PIXEL_WIDTH
  }else this.size_.width=0
};
*/
/*
Blockly.FieldMatrixColour.prototype.CURSOR="default";
Blockly.FieldMatrixColour.prototype.dispose=function(){
  Blockly.WidgetDiv.hideIfOwner(this);
  Blockly.FieldMatrixColour.superClass_.dispose.call(this)
};

Blockly.FieldMatrixColour.prototype.getValue=function(){
  return this.colour_
};
Blockly.FieldMatrixColour.prototype.setValue=function(a){
  this.sourceBlock_&&Blockly.Events.isEnabled()&&this.colour_!=a&&Blockly.Events.fire(new Blockly.Events.Change(this.sourceBlock_,"field",this.name,this.colour_,a));
  this.colour_=a;
  this.borderRect_&&(this.borderRect_.style.fill=a)
};
*/

/*
  Blockly.FieldMatrixColour.prototype.getText=function(){var a=this.colour_,b=a.match(/^#(.)\1(.)\2(.)\3$/);b&&(a="#"+b[1]+b[2]+b[3]);return a};
  Blockly.FieldMatrixColour.COLOURS=goog.ui.ColorPicker.SIMPLE_GRID_COLORS;
Blockly.FieldMatrixColour.COLUMNS=7;
Blockly.FieldMatrixColour.prototype.setColours=function(a){
  this.colours_=a;
  return this
};

Blockly.FieldMatrixColour.prototype.setColumns=function(a){
  this.columns_=a;
  return this
};
*/
/*
Blockly.FieldMatrixColour.prototype.showEditor_=function(){
  Blockly.WidgetDiv.show(this,this.sourceBlock_.RTL,Blockly.FieldMatrixColour.widgetDispose_);
  var a=new goog.ui.ColorPicker;
  a.setSize(this.columns_||Blockly.FieldMatrixColour.COLUMNS);
  a.setColors(this.colours_||Blockly.FieldMatrixColour.COLOURS);
  var b=goog.dom.getViewportSize(),c=goog.style.getViewportPageOffset(document),d=this.getAbsoluteXY_(),e=this.getScaledBBox_();
  a.render(Blockly.WidgetDiv.DIV);
  a.setSelectedColor(this.getValue());
  var f=goog.style.getSize(a.getElement());
  d.y=d.y+f.height+e.height>=b.height+c.y?d.y-(f.height-1):d.y+(e.height-1);
  this.sourceBlock_.RTL?(d.x+=e.width,d.x-=f.width,d.x<c.x&&(d.x=c.x)):d.x>b.width+c.x-f.width&&(d.x=b.width+c.x-f.width);
  Blockly.WidgetDiv.position(d.x,d.y,b,c,this.sourceBlock_.RTL);
  var g=this;
  Blockly.FieldMatrixColour.changeEventKey_=goog.events.listen(a,goog.ui.ColorPicker.EventType.CHANGE,function(a){
    a=a.target.getSelectedColor()||"#000000";
    Blockly.WidgetDiv.hide();
    g.sourceBlock_&&(a=g.callValidator(a)
      );
null!==a&&g.setValue(a)
})};
*/


/*
Blockly.FieldMatrixColour.widgetDispose_=function(){
  Blockly.FieldMatrixColour.changeEventKey_&&goog.events.unlistenByKey(Blockly.FieldMatrixColour.changeEventKey_);Blockly.Events.setGroup(!1)
};*/
