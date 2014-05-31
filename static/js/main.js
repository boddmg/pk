var FIGHT_CONFIG = {};
FIGHT_CONFIG.MAX_ATTACK = 300;
FIGHT_CONFIG.MAX_DEF = 200;
FIGHT_CONFIG.MAX_LUCK = 100;
FIGHT_CONFIG.MAX_SPEED = 100;
FIGHT_CONFIG.MAX_ACCURATELY = 100;
FIGHT_CONFIG.MAX_HP = 500;

FIGHT_CONFIG.FACTORY_LUCK = 30;
FIGHT_CONFIG.FACTORY_ACCURATELY = 3;

person = function() {

};

personRenrenFactory = function(personData)
{

	newPerson = new person();

	newPerson.name = personData.name;
	newPerson.attack=personData.a;
	newPerson.def=personData.b;
	newPerson.luck=personData.c;
	newPerson.speed=personData.d;
	newPerson.accurately=personData.e;
	newPerson.maxHp=personData.f;
	newPerson.hp=personData.g;
}

personBongFactory = function(personData)
{

	newPerson = new person();

	newPerson.name = personData.name;
	newPerson.attack=personData.a;
	newPerson.def=personData.b;
	newPerson.luck=personData.c;
	newPerson.speed=personData.d;
	newPerson.accurately=personData.e;
	newPerson.maxHp=personData.f;
	newPerson.hp=personData.g;
}



movement = function (attacker,defer) {
	var text = attacker.name + " 对 " + defer.name + "展开攻击,";
	var accurately = attacker.accurately * FIGHT_CONFIG.FACTORY_ACCURATELY / FIGHT_CONFIG.MAX_ACCURATELY*Math.random();
	var speed = attacker.speed / FIGHT_CONFIG.MAX_SPEED*Math.random();
	var miss = false;
	if (accurately<speed) miss = true;

	var attack = attacker.attack+(attacker.luck*FIGHT_CONFIG.FACTORY_LUCK/FIGHT_CONFIG.MAX_LUCK*Math.random());
	var def = defer.def+(defer.luck*FIGHT_CONFIG.FACTORY_LUCK/FIGHT_CONFIG.MAX_LUCK*Math.random());
	var hurt = attack - def;
	if(hurt<0)hurt=0;

	if (miss) 
		{			
			render([person1,person2],defer.name +"躲开了");
			setTimeout(function() {movement(defer,attacker)},300);
		}else
		{
			defer.hp -= hurt;
			if (defer.hp<=0) 
			{
				defer.hp=0;
				render([person1,person2],attack.name +"获得了胜利");
			}else
			{
				render([person1,person2],defer.name +"收到了" + hurt +"的伤害");
				setTimeout(function() {movement(defer,attacker)},300);
			}
		}
}

render = function (persons,text) {
	var i=0;
	for(i =0;i< persons.length;i++)
	{
		$("#name-"+i).text(persons[i].name);
		$("#atk-"+i).text(persons[i].attack);
		$("#def-"+i).text(persons[i].def);
		$("#speed-"+i).text(persons[i].speed);
		$("#accurately-"+i).text(persons[i].accurately);
		$("#lucky-"+i).text(persons[i].lucky);
	}
	$("#fight").text($("#fight").text()+text+"\r\n");
}

var testPersondata={};
testPersondata.name = "tester";
testPersondata.a=FIGHT_CONFIG.MAX_ATTACK*0.7;
testPersondata.b=FIGHT_CONFIG.MAX_DEF*0.7;
testPersondata.c=FIGHT_CONFIG.MAX_LUCK*0.7;
testPersondata.d=FIGHT_CONFIG.MAX_SPEED*0.7;
testPersondata.e=FIGHT_CONFIG.MAX_ACCURATELY*0.7;
testPersondata.f=FIGHT_CONFIG.MAX_HP*0.7;

person1=personRenrenFactory(testPersondata);

testPersondata.name = "tester";
testPersondata.a=FIGHT_CONFIG.MAX_ATTACK*0.5;
testPersondata.b=FIGHT_CONFIG.MAX_DEF*0.5;
testPersondata.c=FIGHT_CONFIG.MAX_LUCK*0.5;
testPersondata.d=FIGHT_CONFIG.MAX_SPEED*0.5;
testPersondata.e=FIGHT_CONFIG.MAX_ACCURATELY*0.5;
testPersondata.f=FIGHT_CONFIG.MAX_HP*0.5;

person2=personRenrenFactory(testPersondata);
render([person1,person2],"准备战斗");