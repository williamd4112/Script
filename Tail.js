#pragma strict
//指定FacingTail給進入範圍的敵人的AI_PathFinding
private var HitPathScript : AI_PathFinding  ;

function Start () {

}

function Update () {


}

//在最佳攻擊範圍觸發區域 : 咬住機尾
function OnTriggerStay( Hit : Collider )
{
    //獲取碰撞物的路徑資訊 (看看是不是衝著這個碰撞器的主人而來 , 用碰撞器判斷)
    //宣告進入機尾範圍內的機體的路徑腳本
     if(Hit.gameObject)//防止突然被破壞
     HitPathScript = Hit.gameObject.GetComponent(AI_PathFinding); 
     if(HitPathScript)
     {
         if(HitPathScript.TargetTail==transform)
        {   
           //如果有腳本(因為有可能取到RaycastHit的物件)
              HitPathScript.FacingTail = true;
              
        }   
     }  
}


//離開最佳攻擊範圍觸發區域 : 沒有咬住機尾
function OnTriggerExit ( Hit : Collider )
{
    //獲取碰撞物的路徑資訊 (看看是不是衝著這個碰撞器的主人而來 , 用碰撞器判斷)
    //宣告進入機尾範圍內的機體的路徑腳本
     if(Hit.gameObject)//防止突然被破壞
     HitPathScript = Hit.gameObject.GetComponent(AI_PathFinding); 
     if(HitPathScript)
     {
         if(HitPathScript.TargetTail==transform)
        {   
           //如果有腳本(因為有可能取到RaycastHit的物件)
              HitPathScript.FacingTail = false;
             
        }   
     }  

}