#pragma strict
var MindToSend : GameObject ;
private var MindScript : AI_Mind ;
function Start () {
MindScript =  MindToSend.GetComponent(AI_Mind);

}

function Update () {

}

function OnTriggerStay( Stay : Collider)
{

//由陣營標籤判斷在範圍內的是否為敵機,在指定資料給mind

if(MindToSend.gameObject.tag == "Enemy_Aircraft")
{
  if(Stay.gameObject.tag == "Friend_Aircraft")
  { 
    MindScript.isInAttackArea = true;
  }
}
if(MindToSend.gameObject.tag == "Friend_Aircraft")
{
  if(Stay.gameObject.tag == "Enemy_Aircraft")
  { 
    MindScript.isInAttackArea = true;
  }
}

}

function OnTriggerExit( Stay : Collider)
{

//由陣營標籤判斷在範圍內的是否為敵機,在指定資料給mind

if(MindToSend.gameObject.tag == "Enemy_Aircraft")
{
  if(Stay.gameObject.tag == "Friend_Aircraft")
  { 
    MindScript.isInAttackArea = false;
  }
}
if(MindToSend.gameObject.tag == "Friend_Aircraft")
{
  if(Stay.gameObject.tag == "Enemy_Aircraft")
  { 
    MindScript.isInAttackArea = false;
  }
}

}