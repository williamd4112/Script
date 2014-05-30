#pragma strict
var InitVelocity :float ;
function Start () {

}

function Update () {

  transform.Translate(Vector3.forward * InitVelocity * Time.deltaTime);

}