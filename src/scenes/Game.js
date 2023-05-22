import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('Game');
    }

    preload ()
    { 
        this.load.image("BG", '../../assets/bg.png');
        this.load.image("KitePlace", '../../assets/cut lines 1.png');
        
        this.load.image("Glue", '../../assets/glue.png');
        this.load.image("Rope", '../../assets/rope.png');
        this.load.image("Sticks", '../../assets/Wood.png');
        this.load.image("KitePaper", '../../assets/small kites blue.png');

        this.load.image("GlueTool", '../../assets/bottle tool.png');
        this.load.image("RopeTool", '../../assets/rope tool.png');
        this.load.image("SticksTool", '../../assets/Wood Tool.png');
        this.load.image("KitePaperTool", '../../assets/cut kite blue.png');
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
