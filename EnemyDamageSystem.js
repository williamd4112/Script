#pragma strict
var HP : int ;//HP
var AP : int ;//AP
var FullHP : int = 100 ;//滿血
var isDisplayHP : boolean ;//是否顯示HP
var isDisplayLocked : boolean;//是否顯示鎖定
var BarToDisplayHP : GameObject ; //HP量表
var BarToDisplayLocked : GameObject ; //鎖定指示器
var ExplosionEffectSource : GameObject ;//爆炸後的效果模板
var isDestroyed : boolean = false;//是否破壞
var NormalDamage : int ;//遭受普通攻擊的傷害
var HeavyDamage : int;//遭受重攻擊的傷害
var Lockable : boolean = false ; //是否可被玩家鎖定



function Start () {

}

function Update () {
  
 
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

function Display_HP( Switch : boolean )
{  
   
   if(!Switch)
   {
     Destroy(BarToDisplayHP,0);
   }

}

function Display_Locked(Switch : boolean)
{
   if(!Switch)
   {
     Destroy(BarToDisplayLocked,0);
   }

}

