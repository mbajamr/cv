    function getFullUrl(url) {
      const baseurl = "cvjs/"+url
      const fullUrl = new URL(baseurl, window.location.origin).href;
      console.log(fullUrl);
	  return fullUrl
    }


    async function loadHTML(url1, id1) {
      let v_sec1 = false;
      const res = await loadSectionNEW(url1, id1);

      if (res.status === 200) {
        
		  try {
			document.getElementById(id1).innerHTML = res.html;
			const container = document.getElementById(id1);
			container.innerHTML = res.html;
		  } catch (err) {
			console.log("res.html:  "+res.html+" id1  "+id1+" error:  "+err.message);
		  }
	
		
	  } else {
		console.info('Failed to load section:', res2.error || 'Unknown error id '+id1);
	  }
    }

    async function loadSectionNEW(url, id) {
      const fullUrl = getFullUrl(url);
	  //console.log(fullUrl);

      try {
        const res = await fetch(fullUrl, { cache: "no-store" });
        const html = await res.text();
		//console.log("id  "+id+"res  "+html);

        if (!res.ok) {
          // Handle expected HTTP error here
          return {
            status: res.status,
            ok: false,
            html,
            error: `HTTP error ${res.status}`
          };
        }

        return {
          status: res.status,
          ok: res.ok,
          html
        };
      } catch (err) {
        return {
          status: 0,
          ok: false,
          html: "",
          error: err.message
        };
      }
    }

function noTexto(thefield)
    {  
      if (event.keyCode < 46 || event.keyCode > 57 || event.keyCode == 47  ) 
      {
     //alert("Solo se permiten valores numericos para este campo");
          event.returnValue = false;
      }
    } 

function noTextoCopyPaste(thefield)
    {  
      if (event.keyCode < 46 || event.keyCode > 57 || event.keyCode == 47  ) 
      {
     alert("Solo se permiten valores numericos para este campo");
          event.returnValue = false;
      }
    } 

  function hide() {
	 document.getElementById('AWS').style.visibility = 'hidden';
  }
  function show() {
	 document.getElementById('AWS').style.visibility = 'visible';
  }

function runWithHash(value) {
	window.location.hash = value;
	
	const parts = value.split("/");
	let menu = parts[0];
	let submenu = parts[1];
	if (submenu==null){
	  //alert ("Your browser does not support AJAX!");
	  submenu="All";
	} 

	// use hash here
	console.log ("menu: " + menu + "  submenu: " + submenu);
	showDataList(menu,submenu);
}

function changehash(value) {
	window.location.hash = value;
	runWithHash(value);
}

function getMenu(pMenu) {
    return document.getElementById(pMenu);
	//const menu = document.getElementById("RP");
}


document.addEventListener("DOMContentLoaded", function () {
	const hash = window.location.hash.substring(1);
	//hash = window.location.hash.substring(1)+"/All";
	console.log ("hash: " + hash);
	
	//const menu = document.getElementById("RP");
	//console.log ("menu: " + menu);
	//console.log ("menu.value: " + menu.value);

	runWithHash(hash);
	//runWithHash(hash+"/All");

});


  function showDataList(pSection, pSubSection = null) {
	//alert ("pSection: " + pSection);
	console.log ("pSection: " + pSection + "   pSubSection: " + pSubSection);

	//const hash = window.location.hash.substring(1);

	//if (hash) {
	//	pSection = hash;
	//}
	
	//alert ("pSection: " + pSection);

	if (pSection == 'Base') {
		loadHTML('Base/Menu.html','Menu');
		loadHTML('Base/SubMenu.html','SubMenu');
		loadHTML('Base/Main.html','Principal');
		hideSection('contentSection3');
		showSection('contentSection1');
		showSection('contentSection2');
	} else if (pSection == 'EP') {
		loadHTML('EP/Menu.html','Menu');
		loadHTML('EP/SubMenu.html','SubMenu');
		loadHTML('EP/AFinancial.html','Principal');
		hideSection('contentSection3');
		showSection('contentSection1');
		showSection('contentSection2');
		if (pSubSection == 'AFinancial') {
			loadHTML('EP/AFinancial.html','Principal');
		} else if (pSubSection == 'ABanking') {
			loadHTML('EP/ABanking.html','Principal');				
		} else if (pSubSection == 'ATele') {
			loadHTML('EP/ATele.html','Principal');				
		} else if (pSubSection == 'AInsurance2') {
			loadHTML('EP/AInsurance2.html','Principal');				
		} else if (pSubSection == 'ABrewer') {
			loadHTML('EP/ABrewer.html','Principal');				
		} else if (pSubSection == 'AFood') {
			loadHTML('EP/AFood.html','Principal');				
		} else if (pSubSection == 'AInsurance1') {
			loadHTML('EP/AInsurance1.html','Principal');				
		} else if (pSubSection == 'AAirline') {
			loadHTML('EP/AAirline.html','Principal');				
		} else if (pSubSection == 'FAH') {
			loadHTML('EP/FAH.html','Principal');				
		} else if (pSubSection == 'Emerson') {
			loadHTML('EP/Emerson.html','Principal');				
		} else if (pSubSection == 'Novem') {
			loadHTML('EP/Novem.html','Principal');				
		} else if (pSubSection == 'VCEmmsa') {
			loadHTML('EP/VCEmmsa.html','Principal');				
		} else if (pSubSection == 'VC711') {
			loadHTML('EP/VC711.html','Principal');				
		} else if (pSubSection == 'VCMetalsa') {
			loadHTML('EP/VCMetalsa.html','Principal');				
		} else if (pSubSection == 'PISD') {
			loadHTML('EP/PISD.html','Principal');				
		} else if (pSubSection == 'ProlecGE') {
			loadHTML('EP/ProlecGE.html','Principal');				
		} else if (pSubSection == 'ATI') {
			loadHTML('EP/ATI.html','Principal');				
		} else if (pSubSection == 'CINTERSAN') {
			loadHTML('EP/CINTERSAN.html','Principal');				
		}
	} else if (pSection == 'Ed') {
		loadHTML('Ed/Main.html','PrincipalWide');
		loadHTML('Ed/SubMenu.html','SubMenu');
		hideSection('contentSection1');
		hideSection('contentSection2');
		showSection('contentSection3');
	} else if (pSection == 'Sk') {
		loadHTML('Sk/Main.html','PrincipalWide');
		loadHTML('Sk/SubMenu.html','SubMenu');
		hideSection('contentSection1');
		hideSection('contentSection2');
		showSection('contentSection3');
	} else if (pSection == 'Crt') {
		loadHTML('Cert/Main.html','PrincipalWide');
		loadHTML('Cert/SubMenu.html','SubMenu');
		hideSection('contentSection1');
		hideSection('contentSection2');
		showSection('contentSection3');
		//updateCounts('All');
		//filterCerts('AWS');
		
		//filterCerts('All');
		
		//const menu = document.getElementById("RP");
		//console.log ("menu: " + menu);
		//console.log ("menu.value: " + menu.value);
		const menu = getMenu("RP");

		if (menu) {
			menu.value = pSection+"/"+pSubSection;
			console.log ("menu.value  " + menu.value + " pSection: " + pSection + "   pSubSection: " + pSubSection);
		}
		else {
			console.log ("not set  " + " pSection: " + pSection + "   pSubSection: " + pSubSection);
		}
		//filterCerts('All');

	} else if (pSection == 'Prj') {
		loadHTML('Prj/Menu.html','Menu');
		loadHTML('Prj/SubMenu.html','SubMenu');
		loadHTML('Prj/QPS.html','Principal');
		hideSection('contentSection3');
		showSection('contentSection1');
		showSection('contentSection2');
		if (pSubSection == 'QPS') {
			loadHTML('Prj/QPS.html','Principal');
		} else if (pSubSection == 'PMKTSOT') {
			loadHTML('Prj/PMKTSOT.html','Principal');		
		} else if (pSubSection == 'PT') {
			loadHTML('Prj/PT.html','Principal');
		} else if (pSubSection == 'CT') {
			loadHTML('Prj/CT.html','Principal');
		} else if (pSubSection == 'AGILE') {
			loadHTML('Prj/AGILE.html','Principal');
		} else if (pSubSection == 'EC') {
			loadHTML('Prj/EC.html','Principal');
		} else if (pSubSection == 'DA') {
			loadHTML('Prj/DA.html','Principal');
		} else if (pSubSection == 'MDM') {
			loadHTML('Prj/MDM.html','Principal');
		} else if (pSubSection == 'TT') {
			loadHTML('Prj/TT.html','Principal');
		}
	}
}

function showSection(sectionId) {
    document.getElementById(sectionId).style.display = 'block';
}

function hideSection(sectionId) {
    document.getElementById(sectionId).style.display = 'none';
}
