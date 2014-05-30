#pragma strict
var Target : GameObject ;//從發射器指定
var speed : float = 5;//定義速度,預設為5
var RotateSpeed : float = 10;//彈道修正的速度
private var TargetDirection : Vector3 ; //目標方向


function Start () {
}    

function Update () {
     //如果有目標,就開始追蹤
     if(Target)
     { 
       TargetDirection = (Target.transform.position - transform.position);
       var Rotation = Quaternion.LookRotation(TargetDirection) ;
       transform.rotation = Quaternion.Slerp( transform.rotation , Rotation , Time.deltaTime*RotateSpeed  ) ;
       transform.Translate(Vector3.forward*speed*Time.deltaTime);
     }
     //如果沒有目標,就自毀
     else
     {
       Destroy(gameObject,0);
     }
     
}



