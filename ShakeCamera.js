#pragma strict
//攝影機原始位置
var OriginalPos : Vector3 ;

function Start () {
   OriginalPos = transform.localPosition;

}

function Update () {
 

}

function Shake()
{
    transform.Translate(Random.Range(-0.25,0.25),Random.Range(-0.075,0.075),0, Space.Self);
    
   
}

function Return()
{
    transform.localPosition = OriginalPos;
  
}