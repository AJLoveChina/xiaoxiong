import {fabric} from "fabric";
import {IGroupOptions, Object} from "fabric/fabric-impl";

export class XGroup extends fabric.Group {
  type = "XGroup";

  // borderColor = '#4285f4';
  // cornerColor = '#ea4335';
  cornerSize = 6;
  transparentCorners = false;


  constructor(objects?: Object[], options?: IGroupOptions, isAlreadyGrouped?: boolean) {
    super(objects, options, isAlreadyGrouped);
  }

}
