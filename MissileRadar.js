#pragma strict
//搭載者
//可鎖定方框來源

var User : GameObject ;
var LockableSignSource : GameObject ;


//搭載者的控制器腳本
//目標索引值
private var UserScript : PlayerController ;
private var TargetIndex : int = 0 ;

function Start () {
//設定控制器腳本
UserScript = User.GetComponent(PlayerController);

}

function Update () {


}

//觸發雷達範圍
function OnTriggerEnter( Detected : Collider)
{  
//如果進入觸發範圍的物件的標籤是敵軍的
if(Detected.gameObject.tag == "Enemy_Aircraft")
{  
  
  //將偵測到的物件送入目標列表
  UserScript.Targetlist.Push(Detected.gameObject);
  //敵意目標腳本
  var TargetScript : EnemyDamageSystem = Detected.gameObject.GetComponent(EnemyDamageSystem);
  //使敵人變得可鎖定
  TargetScript.Lockable = true ;
  
  //顯示可鎖定方框 ---
  //動態生成可鎖定方框
  //宣告方框腳本
  var LockableSign : GameObject = Instantiate(LockableSignSource,Detected.transform.position,Detected.transform.rotation);
  var LockableSignScript : GUI_LockableSign = LockableSign.GetComponent(GUI_LockableSign);
  LockableSignScript.Target = Detected.gameObject;
  LockableSignScript.SourceCamera = UserScript.ControlledCamera;

  

}

}
//離開雷達範圍
function OnTriggerExit( Detected : Collider )
{    
//如果離開觸發範圍的是敵人
if(Detected.gameObject.tag == "Enemy_Aircraft")
{
  //如果離開偵測範圍的是正在鎖定的目標,就取消鎖定
  if(Detected.gameObject == UserScript.SelectTarget)
  {
     UserScript.SelectTarget = null;
     
  }
  //設定離開觸發範圍的目標的腳本
  var TargetScript : EnemyDamageSystem = Detected.gameObject.GetComponent(EnemyDamageSystem);
  //使敵人變得不可鎖定
  TargetScript.Lockable = false;
}

    
} 





