#pragma strict
/*NOTE : X Wing 是四管炮,此腳本存在於四管炮的父級物件之中, 透過呼叫本身的主開火函數(呼叫四管子物件的火炮開火) 提供AI Behave存取行為函數*/
//設定四管炮子物件腳本列表
var GunChildrenScriptsList : AI_Weapon_X_Wing_Gun_Child[] ;
function Start()
{

}
function Update()
{


}
function Fire()
{
//從子物件指定腳本列表
GunChildrenScriptsList = GetComponentsInChildren.<AI_Weapon_X_Wing_Gun_Child>();
//一個一個執行開火函數
for( var ToFire in GunChildrenScriptsList)
{
     ToFire.FireChild();
     yield WaitForSeconds(0.2);

}

}
