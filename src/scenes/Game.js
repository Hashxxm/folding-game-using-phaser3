import Phaser from 'phaser';

import BG from '../../assets/bg.png';
import KitePlace from '../../assets/cut lines 1.png';
import Glue from '../../assets/glue.png';
import Rope from '../../assets/rope.png';
import Sticks from '../../assets/Wood.png';
import KitePaper from '../../assets/small kites blue.png';
import GlueTool from '../../assets/bottle tool.png';
import RopeTool from '../../assets/rope tool.png';
import SticksTool from '../../assets/Wood Tool.png';
import KitePaperTool from '../../assets/cut kite blue.png';

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('Game');
    }

    preload ()
    { 
        this.load.image("BG", BG);
        this.load.image("KitePlace", KitePlace);
        
        this.load.image("Glue", Glue);
        this.load.image("Rope", Rope);
        this.load.image("Sticks", Sticks);
        this.load.image("KitePaper", KitePaper);

        this.load.image("GlueTool", GlueTool);
        this.load.image("RopeTool", RopeTool);
        this.load.image("SticksTool", SticksTool);
        this.load.image("KitePaperTool", KitePaperTool);
    }

    create ()
    {
        this.FoldingOrder = [false, false, false, false];

        //Background
        this.add.image(640, 360, 'BG').setScale(0.67);
        this.add.image(640, 360, 'KitePlace').setScale(0.3);
        
        //Win Text
        this.WinText = this.add.text(640, 550, "YOU WIN!!!!!");
        this.WinText.setTint(0xff0000);
        this.WinText.setFontSize(50);
        this.WinText.setOrigin(0.5, 0.5);
        this.WinText.setVisible(false);

        //Kite Parts
        this.Glue = this.add.image(640, 360, 'Glue').setScale(0.33);
        this.Sticks = this.add.image(640, 360, 'Sticks').setScale(0.31);
        this.KitePaper = this.add.image(640, 360, 'KitePaper').setScale(3);
        this.Rope = this.add.image(732, 425, 'Rope').setScale(0.33);
        
        //Folding Tools
        this.GlueTool = this.add.image(250, 500, 'GlueTool').setScale(0.33);
        this.GlueTool.setInteractive();
        this.GlueTool.index = 0;

        this.SticksTool = this.add.image(1030, 200, 'SticksTool').setScale(0.26);
        this.SticksTool.setInteractive();
        this.SticksTool.index = 1;

        this.KitePaperTool = this.add.image(250, 200, 'KitePaperTool').setScale(0.17);
        this.KitePaperTool.setInteractive();
        this.KitePaperTool.index = 2;

        this.RopeTool = this.add.image(1030, 500, 'RopeTool').setScale(0.3);
        this.RopeTool.setInteractive();
        this.RopeTool.index = 3;

        //Disable Folding parts at beginning
        this.Glue.setVisible(false);
        this.Sticks.setVisible(false);
        this.KitePaper.setVisible(false);
        this.Rope.setVisible(false);

        //Onclick handling
        this.input.on("gameobjectdown", this.ToolClickHandler.bind(this));
    }

    update ()
    {
    }

    ToolClickHandler(pointer, Tool)
    {
        switch (Tool.index) {
            case 0:
                if (this.CheckOrder(0))
                {
                    this.Glue.setVisible(true);
                    this.FoldingOrder[0] = true;
                }
                break;
            case 1:
                if (this.CheckOrder(1))
                {
                    this.Sticks.setVisible(true);
                    this.FoldingOrder[1] = true;
                }
                break;
            case 2:
                if (this.CheckOrder(2))
                {
                    this.KitePaper.setVisible(true);
                    this.FoldingOrder[2] = true;
                }
                break;
            case 3:
                if (this.CheckOrder(3))
                {
                    this.Rope.setVisible(true);
                    this.FoldingOrder[3] = true;
                }
                break;
            default:
                break;
        }

        if (this.CheckOrder(this.FoldingOrder.length))
        {
            this.WinText.setVisible(true);
            this.scene.pause()
        }        
    }

    CheckOrder(index)
    {
        for (let i = 0; i < index; i++)
        {
            if (!this.FoldingOrder[i]) return false;
        }
        return true;
    }
}
