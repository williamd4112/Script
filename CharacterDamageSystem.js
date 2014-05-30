#pragma strict
var HP : int ;//HP
var HP_Bar : GameObject;//用來顯示的血量條
var Status : GUITexture;//機體狀態
var ExplosionEffectSource : GameObject ;//爆炸後的效果模板
var isDestroyed : boolean = false;//是否破壞
var NormalDamage : int ;//遭受普通攻擊的傷害
var HeavyDamage : int ; //遭受重攻擊後的傷害

function Update () {
  
  //隨時顯示血量
  HP_Bar.guiText.text =  HP.ToString()+"%";
  //如果HP等於零則被破壞
  if(HP<=0)
  {
    isDestroyed = true;
  
  }
  //如果HP等於零而且被破壞則動態生成爆炸效果、摧毀自身、是否被破壞為假(為了終止迴圈)
  if( HP<=0 && isDestroyed==true)
  {
     
     var ExplosionEffect  : GameObject = Instantiate(ExplosionEffectSource , transform.position, transform.rotation);
     Destroy(gameObject, 0.1);
     isDestroyed=false;
  }
  
  //機體破壞狀態
  switch(true)
  {
     case HP<=50:
          Status.guiTexture.color = Color.red;
          break;
     case HP<=75:
          Status.guiTexture.color = Color.yellow;
          break;     
  
  }

}

//損傷系統
function OnCollisionEnter (Target:Collision)
{   
    //判斷被什麼攻擊命中
    switch(true)
    {
      case (HP>0 && Target.gameObject.tag == "Tag_NormalAttack"): //普通攻擊
           HP = HP - NormalDamage ;
           break;     
      case (HP>0 && Target.gameObject.tag == "Tag_HeavyAttack"): //重攻擊
           HP = HP - HeavyDamage ;
           break;          
      default:
         HP = HP - 1;       
    }
}
