#pragma strict
/*路徑決定變數 (除了目標資訊之外都是區域變數,不可由外部指定)*/
//目標位置 - 由 AI Mind指定
//碰撞探測器
//目標機機尾
//前進方向 (目標方向 (例如 : 目標機機尾 或 目標機)) 
//旋轉角度
//與目標的距離
var Target : GameObject; 
var TargetTail : Transform ;
private var Hit : RaycastHit ;
private var Direction : Vector3 ;
private var Rotation : Quaternion ;
private var DistanceWithTarget : float ;
/*行動方式變數 - 由AI搭載機體決定*/
//轉向速度
//移動速度
//偵測距離
//下降加速度
//上升加速度
//設定最大速度
//設定最小速度
var RotateSpeed : float ;
var TranslateSpeed : float ;
var DetectDistance : float ;
var SlowDownSpeed : float ;
var SpeedUpSpeed : float ;
var MaxSpeed : float ;
var MinSpeed : float ;
/*範圍判斷變數 - 由範圍觸發器指定*/
//是否咬住機尾 - 由目標機尾的觸發區域指定
var FacingTail : boolean = false;
/*狀態 - 由AI Mind指定*/
//------------預留----------------//
//-------------------------------//

function Start () {
}

function Update () 
{

//如果有目標
if(Target)
{
//**************************從目標獲取路徑資料**************************//
  
  //Target由AI Mind指定 
  TargetTail = Target.transform.FindChild("Tail");
  
  //分為兩個範圍來決定行動模式
  /*正常範圍 (非追尾)*/
  if(!FacingTail)
  {
     //如果有機尾就追機尾
     //追擊 : 目標機尾
     if(TargetTail)
     Direction = (TargetTail.position - transform.position).normalized ;
     //有障礙
     if(Physics.Raycast( transform.position , transform.forward , Hit , DetectDistance ))
     {      
            //找路 : 既定方向(目標機尾)
            Direction = Direction + Hit.normal*RotateSpeed ;
     }
     
     
     //無障礙就追擊
  }
  /*追尾範圍*/
  else
  {    
     //追擊 : 目標
     Direction = (Target.transform.position - transform.position).normalized ;
     //有障礙物
     if(Physics.Raycast(transform.position , transform.forward , Hit , DetectDistance ))
     {      
            //找路 : 既定方向(目標)
            Direction = Direction + Hit.normal*RotateSpeed ;
     }
    
  }

//**************************設定搭載者的前進路徑**************************//
  
  //轉向新的前進方向向量
  //與目標的距離
  Rotation = Quaternion.LookRotation(Direction) ;
  DistanceWithTarget = Vector3.Distance(Target.transform.position , transform.position);
  //慢慢旋轉至新的方向
  //向前移動
  transform.rotation = Quaternion.Slerp( transform.rotation , Rotation , Time.deltaTime*RotateSpeed  ) ;
  //如果咬住機尾就減速  (等AI系統完備可能會換成以武器射線來判斷是否咬住機尾)
  if(FacingTail)
  {
     //慢慢減速到最小速度
     if(TranslateSpeed>MinSpeed)
     {
       TranslateSpeed = TranslateSpeed - SlowDownSpeed;
       if(TranslateSpeed<MinSpeed)
       {
         TranslateSpeed = MinSpeed;
       }
     }
   
     transform.Translate(Vector3.forward * TranslateSpeed * Time.deltaTime);
  }
  //如果沒有咬住且前方不是目標加速
  else
  {   
     
     //慢慢加速到最大速度
      if(TranslateSpeed<MaxSpeed)
      {  
        TranslateSpeed = TranslateSpeed + SpeedUpSpeed;
        if(TranslateSpeed>MaxSpeed)
        {
          TranslateSpeed = MaxSpeed;
        }
      }
      
      transform.Translate(Vector3.forward * TranslateSpeed * Time.deltaTime);
   
  }

}

}
