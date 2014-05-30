#pragma strict
//攝影機初始位置
var OriginalPos : Vector3 ;
var User : GameObject ;
//使用者腳本
//使用者的損傷系統腳本
private var UserScript : PlayerController;
private var UserDamageSystem : CharacterDamageSystem;
function Start () {
  //設定初始位置
  OriginalPos = transform.localPosition;
  UserScript = User.GetComponent(PlayerController);
  UserDamageSystem = User.GetComponent(CharacterDamageSystem);
}

function Update () {
//Shitf : 攝影機FOV提高 + 震動
if(Input.GetButton("Run")&&Input.GetAxis("Vertical")>0 && !UserScript.Overheat)
{   
    Shake();
    //攝影機FOV提高
    if(camera.fieldOfView<=80)
    {
      camera.fieldOfView = camera.fieldOfView + 1;
    }
}
else
{
    Return();
    //攝影機FOV降低
    if(camera.fieldOfView>=60)
    {
      camera.fieldOfView = camera.fieldOfView - 1;
    }
}
//損傷過重

}

//震動
function Shake()
{
    transform.Translate(Random.Range(-0.05,0.05),Random.Range(-0.02,0.02),0, Space.Self);
    
}
//返回原位
function Return()
{   if(transform.localPosition != OriginalPos)
    transform.localPosition = OriginalPos;
  
}

function Hit()
{
   var HitEffect:ScreenOverlay = gameObject.GetComponent(ScreenOverlay);
   HitEffect.intensity = HitEffect.intensity + 1;
   Shake();
   yield WaitForSeconds(0.08);
   Return();
   HitEffect.intensity = HitEffect.intensity - 1;
   
}