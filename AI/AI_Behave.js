#pragma strict
//AI_Behave賦予AI_Mind行為呼叫的列表 , 而各個行為函數來自各個機體零件的腳本 , AI Behave存取機體零件的腳本來呼叫各個功能來執行行為
//武器物件變數(套用到不同機體上,可以在編輯器做不同的設定)
var MainWeapon : GameObject ;

function Awake()
{
  //MainWeapon = gameObject.Find("/MainWeapon");
}

//行為 : 主要武器開火
function MainWeaponFire()
{
   //依照搭載此AI的機體決定開火所要存取的腳本 (並非各機獨立,而是為了因應特殊機體的武器,例如:X-Wing的主武器是四管炮因此武器腳本與其他機體不同)  
   switch(gameObject.name)
   {
       case "X-Wing":
             var WeaponScript_X_Wing =  MainWeapon.GetComponent(AI_Weapon_X_Wing_Gun_Parent);
             if(WeaponScript_X_Wing)
             WeaponScript_X_Wing.Fire();
             break;
       default:
             var WeaponScript =  MainWeapon.GetComponent(AI_MainWeapon);
             if(AI_MainWeapon)
             WeaponScript.Fire();
             break;
   }


}