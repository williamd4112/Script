#pragma strict
//AI_Sensor降周遭的物件掃描後做成資料輸入AI_Mind , 攻擊目標的資料依照
//搭載者的機體 (由AI Mind設定) ,  透過GetComponentInChildren找尋AI_Sensor來存取此腳本)
//搭載者的AI_Mind腳本
var User : GameObject ;  
var UserScript : AI_Mind ;

function Start()
{

}

//觸發雷達範圍
//待在雷達範圍內被偵測到的物件只要Mind的selecttarget是null就指定給selectTarget
function OnTriggerStay( Detected : Collider)
{ 
 
   //設定AI_Mind腳本
   UserScript = User.GetComponent(AI_Mind);
   //敵人陣列
  
   //依據標籤判斷陣營,依據陣營標籤再從世界中找尋有此標籤的物件 (尋找與本身陣營相反的標籤)
   switch(gameObject.tag)
   {
      case "FriendRadar":
            if(Detected.gameObject.tag == "Enemy_Aircraft")
            {
              if(UserScript.SelectTarget == null)
              {
                UserScript.SelectTarget = Detected.gameObject;
              }
            }
            break;
      case "EnemyRadar":
            if(Detected.gameObject.tag == "Friend_Aircraft")
            {
              if(UserScript.SelectTarget == null)
              {
                UserScript.SelectTarget = Detected.gameObject;
              }
            }
            break;
      default:
            break;     
   }
   

  
}
/*
function OnTriggerExit( Detected : Collider )
{    
  //如果離開雷達範圍的目標跟Mind選定的目標相同則將陣列第一個元素移除(第二個元素向前挪動,因此Mind的Behave的Target變成原本的第二個元素)
  if(Detected.gameObject == UserScript.SelectTarget)
  {
      //抽走正在瞄準的目標
      UserScript.Targetlist.shift();
      UserScript.Targetlist[0] = UserScript.Targetlist[1];
  }
    
}*/