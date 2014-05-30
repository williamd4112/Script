#pragma strict
//顯示的對象
//來源攝影機
var toDisplayHP_Target : GameObject ;
var CameraToDisplay : Camera ;

function Update () 
{  
   //如果顯示對象跟來源攝影機都存在則顯示GUI
   if(toDisplayHP_Target && CameraToDisplay)
   {  
      //宣告螢幕位置
      //宣告顯示對象的腳本
   
      var ScreenPos: Vector3 =  CameraToDisplay.WorldToViewportPoint (toDisplayHP_Target.transform.position); 
      var toDisplayHP_TargetScript = toDisplayHP_Target.GetComponent(EnemyDamageSystem);
      var Distance : float  = Vector3.Distance(toDisplayHP_Target.transform.position,CameraToDisplay.transform.position);
      
      
      //動態改變GUI位置
      transform.position = ScreenPos;
      guiText.text = toDisplayHP_Target.name + " " + toDisplayHP_TargetScript.HP.ToString()+ "/" +toDisplayHP_TargetScript.FullHP.ToString() + "\n" + Distance.ToString();
      
   }
   
   //如果只有物件不在(專判斷物件毀滅)則移除自身
   if(!toDisplayHP_Target)
   {
      Destroy(gameObject,0);
   }
   
}