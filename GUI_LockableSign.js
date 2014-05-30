#pragma strict
//顯示的目標
//來源攝影機
//鎖定粗框
var Target : GameObject ;
var SourceCamera : Camera ;
var Sign : GameObject ;


function Update () 
{     
   //如果目標存在就宣告目標腳本
   if(Target)
   var TargetScript : EnemyDamageSystem = Target.GetComponent(EnemyDamageSystem);
         
   //如果顯示對象跟來源攝影機都存在且目標為可鎖定則顯示GUI 
   if(Target && SourceCamera && TargetScript.Lockable)
   {  
      //宣告螢幕位置
      //宣告顯示對象的腳本
      //鎖定中的粗框
      var ScreenPos: Vector3 =  SourceCamera.WorldToViewportPoint (Target.transform.position);  
      //動態改變GUI位置
      transform.position = ScreenPos;
      
   }
   //目標不存在飛彈雷達範圍內則自毀
   else
   {
      Destroy(gameObject,0);
   }
   
}

