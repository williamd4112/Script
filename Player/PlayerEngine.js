#pragma strict
var User : GameObject ;
var EngineLight : Light ;
private var UserScript : PlayerController;
function Awake () {
UserScript = User.GetComponent(PlayerController);

}

function Update () {
//引擎粒子 - 增
if(Input.GetButtonDown("Run")&&Input.GetAxis("Vertical")>0 && !UserScript.Overheat)
{   
    particleSystem.startSpeed = 10; // 引擎特效-速率
    particleSystem.emissionRate = 40; // 引擎特效-頻率
}
if(Input.GetButtonUp("Run"))
{
    particleSystem.startSpeed = 3; // 引擎特效-速率
    particleSystem.emissionRate = 20; // 引擎特效-頻率
}
  
//引擎點光源 - 亮 (如果加速且光源亮度小於2.8就增亮)
if(Input.GetButton("Run")&&Input.GetAxis("Vertical")>0 && EngineLight.intensity<=2.8)
{     
    EngineLight.intensity = EngineLight.intensity + 0.1;
}
//引擎點光源 - 暗 (如果沒按住加速且就減低亮度)
if(!(Input.GetButton("Run")&&Input.GetAxis("Vertical")>0) && EngineLight.intensity>0.6)
{
   if(EngineLight.intensity<0.6)
   EngineLight.intensity = 0.6;
   else
   EngineLight.intensity = EngineLight.intensity - 0.1;
}
}