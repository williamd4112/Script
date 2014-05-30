#pragma strict
var Target : Transform ;
function Start () {

}

function Update () {
  var LookRotation = Quaternion.LookRotation((Target.position - transform.position).normalized);
  //兩者Z軸夾角
  var MeZ = transform.forward;
  var TarZ = Target.forward;
  var Angle : float = Vector3.Angle(MeZ , TarZ);
  transform.rotation = Quaternion.RotateTowards( transform.rotation ,  LookRotation  , 10*Time.deltaTime ) ;
  transform.rotation = Quaternion.AngleAxis(Angle, Vector3.up);

}