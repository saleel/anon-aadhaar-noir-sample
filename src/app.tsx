import React from 'react'
import { generateProof } from '@anon-aadhaar/noir-core'
import './styles.scss'

function App() {
  const [qrData, setQrData] = React.useState<string | null>(
    "8259163575998395410294216884136380469956685892150052488437065451544537272028823381012058331104900016170949862194992078675406411614673500428635982291062028490923003780630984433423301235105417377787131661931984964599727049255285879318792495236619560961528175330528230923044174467379560397653507051470100248395988491800303621193017585564341319296489036716964773497652480922601816247855475394255072055155630865556422666204858735313430441358989197942359085778977252174914218750831324262405073486188565379661087624387219845602810004409858067060582723830310306954192817345000453273623216177755588322887355541803994258569827849151852254798713294190907648230081077510592816508733759309449554841585969816906585446495429295879085493920989281432124264686964836843412063229868917416620953791606506977061635857869230322961966933040081525837759953018919032951374647284949205876501534604609019655215562471603371161946541957137254612227929914099003888563475886540925722627409182118438133540745135873329891527671405288082042105248606397547696373988012429641765957373215164223914638446054352114848994560273925881966532950058515181388759591132298529623987123194227812330918793321242727635507097775073470913531111624493576370385944481779207499154345692800114586514930018253620629510671404966362557857641999589084996038042041566831142437243583312354405809351126154203741507594162846336352179343954609499386129314707436439498170844738212884179575970184067773906023308700304595766504002059225628845131658391808799061443662643244237433587394532910535053813919941235917069445490288535690770254964055050593379778806503841922391399545982769046149777275410414936802378789310715386469101351083935892919710110707167748324213165552014082126981342105688852994389004329229607011870745132085215561769894535198146559591966109398235088570991674596662725913989312687633451215056181618710951495328959829445355475946382007067174484187843829682632075742981527603170017383558567515525142187900818201598762722436016733654029911649550767959827096893303631543278516100843293421762867984506025935441477253344987175034417916079625625371854046567321295833019522935272303724497663116543666998220335640687972062287455715754417604421981525656917538633268735987248122223688953567669389081610408785753661463406540493356023533353414845665187659296301626231138335599426042956724260221272505774023358411257317356159623167122090889680494391699098612891443839591040158364788967761812547722827975134074249498746600141474162623701225599279053137171665029207049665126886560795303043957258835332398217358504670108540440086553112969204911544457383791164248286490428962205833992719109104066885727003793530534239190322145789868094191824916635003885589340787668337395036427004773582592606136970224829885297327946705251124207201157878059391302841686982381058544860043878906081086431706218579038805094181604734876076823217950098303441193151451328000264195608403604158930298446358926216003325046476113401255186582872417002832207916555599681630457718321743339538760995883798622573729834417735834210649314285763784726287210633344224738479199260435876897373634088311958610480853339605575937005219222939598641467868545589588057047581729376964"
  );
  const [provingTime, setProvingTime] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

  async function handleProve() {
    setLoading(true);
    setCounter(0);
    
    // Start counter
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 1000);

    try {
      const { generateProof } = await import("@anon-aadhaar/noir-core");
      const { proof, provingTime } = await generateProof(qrData as string);
      console.log(proof, provingTime);
      setProvingTime(provingTime);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      clearInterval(interval);
    }
  }

  return (
    <div className="container">
      <h1>Anon Aadhaar Noir Sample</h1>

      <div className="card">
        <h3>QR Data</h3>
        <textarea
          style={{ width: "100%", height: "200px" }}
          value={qrData ?? ""}
          onChange={(e) => setQrData(e.target.value)}
        />
        
        <button 
          className="btn-prove" 
          onClick={handleProve}
          disabled={loading}
        >
          {loading ? `Generating proof... (${counter}s)` : 'Prove'}
        </button>

        <br />
        {provingTime > 0 && <p>Proving time: {new Intl.NumberFormat().format(provingTime)}ms</p>}
      </div>
    </div>
  );
}

export default App
