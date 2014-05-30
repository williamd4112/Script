#pragma strict
//搭載者的飛機
//來源攝影機
//敵人血量條模板
//友軍血量條模板

var PlayerAircraft : GameObject ;
var SourceCamera : Camera ;
var EnemyHP_Bar_Source : GameObject ;
var FriendHP_Bar_Source : GameObject ;


//戰術地圖
//小地圖中心
//雷達 : 玩家記號
//雷達 : 敵軍標記
//雷達 : 距離尺度
//雷達 : 偵測範圍(雷達半徑)
//雷達 : 放大/縮小
var GUI_TacticalMap : GameObject ;
private var MapCenter : Vector2 = Vector2(140,145);
var PlayerDot : Texture ;
var EnemyDot : Texture ;
private var MapScale : float = 0.2;
var RadarRadius : float = 300 ;
private var Zoom : boolean = false ;

function Update()
{
   //縮放雷達
   if(Input.GetButtonDown("Zoom"))
   {
      Zoom = !Zoom;
      print(Zoom);
      if(Zoom)
      {
        MapScale = 1 ;
        RadarRadius = 100;
        GUI_TacticalMap.guiText.text = "Tactical Map (ZOOM)";
      }
      else
      {
        MapScale = 0.2 ;
        RadarRadius = 300;
        GUI_TacticalMap.guiText.text = "Tactical Map";
      }  
      
   }
}


function OnGUI ()
{  
   //掃描並且顯示敵人在戰術地圖上
   Radar_MapScan();
   
}

//觸發雷達範圍
function OnTriggerEnter( Detected : Collider)
{  
   //敵人陣列
   //友軍陣列
   //目標腳本
   var Enemy;
   var Friend;
   var PlayerAircraftScript = PlayerAircraft.GetComponent(PlayerController);
  
   //在世界中尋找有敵機標籤的物件,傳回敵人陣列
   Enemy = gameObject.FindGameObjectsWithTag("Enemy_Aircraft");
   Friend = gameObject.FindGameObjectsWithTag("Friend_Aircraft");
   //宣告目標腳本
   var TargetScript: EnemyDamageSystem;
   var FriendTargetScript : EnemyDamageSystem ;
   //從敵人陣列中掃描目標
   for( var Target in Enemy)
   {    
        //如果掃描到的目標跟被偵測的觸發的物件一樣就在目標列表中增添資料 (飛彈雷達才增添)
        if( Target == Detected.gameObject)
        {  
            TargetScript = Detected.gameObject.GetComponent(EnemyDamageSystem);
      
           /*敵軍血量資訊*/
           //動態生成HP BAR
           //獲取HP BAR的腳本
           
           var HP_Bar : GameObject = Instantiate(EnemyHP_Bar_Source,Detected.gameObject.transform.position,Detected.gameObject.transform.rotation);
           var HP_Bar_Script = HP_Bar.GetComponent(GUI_EnemyHP);
           
           //設定 顯示對象 並且 設定 來源攝影機 給HP BAR
           HP_Bar_Script.toDisplayHP_Target = Detected.gameObject;
           HP_Bar_Script.CameraToDisplay = SourceCamera;
           //指定給目標的"HP BAR"變數 並且 打開 "是否顯示HP" 並且 將 "是否顯示HP" 變數輸入 "顯示HP" 功能判斷
           TargetScript.BarToDisplayHP = HP_Bar; 
           TargetScript.isDisplayHP = true;
           TargetScript.Display_HP(TargetScript.isDisplayHP);
           
           
           
        }
   }
   //從友軍陣列中獲取目標
   for( var FriendTarget in Friend )
   {        
       if( FriendTarget == Detected.gameObject)
       { 
             FriendTargetScript = Detected.gameObject.GetComponent(EnemyDamageSystem);
             if(FriendTargetScript)
             {
             /*友軍血量資訊*/
             //動態生成HP BAR
             //獲取HP BAR的腳本
             //宣告目標腳本
             var HP_Bar_F : GameObject = Instantiate(FriendHP_Bar_Source,Detected.gameObject.transform.position,Detected.gameObject.transform.rotation);
             var HP_Bar_F_Script = HP_Bar_F.GetComponent(GUI_FriendHP);
           
             HP_Bar_F_Script.toDisplayHP_Target = Detected.gameObject;
             HP_Bar_F_Script.CameraToDisplay = SourceCamera;
             //指定給目標的"HP BAR"變數 並且 打開 "是否顯示HP" 並且 將 "是否顯示HP" 變數輸入 "顯示HP" 功能判斷
             FriendTargetScript.BarToDisplayHP = HP_Bar_F; 
             FriendTargetScript.isDisplayHP = true;
             FriendTargetScript.Display_HP(FriendTargetScript.isDisplayHP);
             }
          
         
       }
   }    

}


function OnTriggerExit( Detected : Collider )
{     
      //宣告目標腳本
      var TargetScript = Detected.gameObject.GetComponent(EnemyDamageSystem);
      if(TargetScript)
      {
       //關閉 "是否顯示HP" 並且 將 "是否顯示HP" 變數輸入 "顯示HP" 功能判斷
       TargetScript.isDisplayHP = false;
       TargetScript.Display_HP(TargetScript.isDisplayHP);
      }
    
}



//雷達 : 戰術地圖掃描
function Radar_MapScan()
{ 
   //宣告目標列表
   var Targetlist : GameObject[] = gameObject.FindGameObjectsWithTag("Enemy_Aircraft");
   for(var Target in Targetlist)
   {
     var Distance : float = Vector3.Distance(Target.transform.position , PlayerAircraft.transform.position);
     var RelativePosition : Vector2 = Vector2(Target.transform.position.x - PlayerAircraft.transform.position.x ,Target.transform.position.z - PlayerAircraft.transform.position.z);
     if(Distance <= RadarRadius)
     Radar_MapDraw(RelativePosition , EnemyDot);
   }
}
//雷達 : 戰術地圖繪製
function Radar_MapDraw(Position : Vector2 ,  Dot : Texture)
{
   
   GUI.DrawTexture(Rect(MapCenter.x-Position.x*MapScale,MapCenter.y+Position.y*MapScale,5,5),Dot);
}


