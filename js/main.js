    function getFullUrl(url) {
      const baseurl = url
      const fullUrl = new URL(baseurl, window.location.origin).href;
      //console.log(fullUrl);
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
			//console.log("res.html:  "+res.html+" id1  "+id1+" error:  "+err.message);
			console.log(" id1  "+id1+" error:  "+err.message);
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
	//console.log ("menu: " + menu + "  submenu: " + submenu);
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
	//console.log ("hash: " + hash);
	
	//const menu = document.getElementById("RP");
	//console.log ("menu: " + menu);
	//console.log ("menu.value: " + menu.value);

	runWithHash(hash);
	//runWithHash(hash+"/All");

});


  function showDataList(pSection, pSubSection = null) {
	//alert ("pSection: " + pSection);
	//console.log ("pSection: " + pSection + "   pSubSection: " + pSubSection);

	//const hash = window.location.hash.substring(1);

	//if (hash) {
	//	pSection = hash;
	//}
	
	//alert ("pSection: " + pSection);

	if (pSection == 'Base') {
		loadHTML('Base/Menu.html','MenuBase');
		loadHTML('Base/SubMenu.html','SubMenuBase');
		loadHTML('Base/Main.html','PrincipalBase');
		hideSection('contentSection3');
		hideSection('contentSection1EP');
		hideSection('contentSection2EP');
		hideSection('contentSection1Prj');
		hideSection('contentSection2Prj');
		hideSection('SubMenuEP');
		hideSection('SubMenuEd');
		hideSection('SubMenuSk');
		hideSection('SubMenuCrt');
		hideSection('SubMenuPrj');
		showSection('SubMenuBase');
		showSection('contentSection1Base');
		showSection('contentSection2Base');
	} else if (pSection == 'EP') {
		loadHTML('EP/Menu.html','MenuEP');
		loadHTML('EP/SubMenu.html','SubMenuEP');
		loadHTML('EP/AFinancial.html','PrincipalEP');
		hideSection('contentSection3');
		hideSection('contentSection1Base');
		hideSection('contentSection2Base');
		hideSection('contentSection1Prj');
		hideSection('contentSection2Prj');
		hideSection('SubMenuBase');
		hideSection('SubMenuEd');
		hideSection('SubMenuSk');
		hideSection('SubMenuCrt');
		hideSection('SubMenuPrj');
		showSection('SubMenuEP');
		showSection('contentSection1EP');
		showSection('contentSection2EP');
		if (pSubSection == 'AFinancial') {
			loadHTML('EP/AFinancial.html','PrincipalEP');
		} else if (pSubSection == 'ABanking') {
			loadHTML('EP/ABanking.html','PrincipalEP');				
		} else if (pSubSection == 'ATele') {
			loadHTML('EP/ATele.html','PrincipalEP');				
		} else if (pSubSection == 'AInsurance2') {
			loadHTML('EP/AInsurance2.html','PrincipalEP');				
		} else if (pSubSection == 'ABrewer') {
			loadHTML('EP/ABrewer.html','PrincipalEP');				
		} else if (pSubSection == 'AFood') {
			loadHTML('EP/AFood.html','PrincipalEP');				
		} else if (pSubSection == 'AInsurance1') {
			loadHTML('EP/AInsurance1.html','PrincipalEP');				
		} else if (pSubSection == 'AAirline') {
			loadHTML('EP/AAirline.html','PrincipalEP');				
		} else if (pSubSection == 'FAH') {
			loadHTML('EP/FAH.html','PrincipalEP');				
		} else if (pSubSection == 'Emerson') {
			loadHTML('EP/Emerson.html','PrincipalEP');				
		} else if (pSubSection == 'Novem') {
			loadHTML('EP/Novem.html','PrincipalEP');				
		} else if (pSubSection == 'VCEmmsa') {
			loadHTML('EP/VCEmmsa.html','PrincipalEP');				
		} else if (pSubSection == 'VC711') {
			loadHTML('EP/VC711.html','PrincipalEP');				
		} else if (pSubSection == 'VCMetalsa') {
			loadHTML('EP/VCMetalsa.html','PrincipalEP');				
		} else if (pSubSection == 'PISD') {
			loadHTML('EP/PISD.html','PrincipalEP');				
		} else if (pSubSection == 'ProlecGE') {
			loadHTML('EP/ProlecGE.html','PrincipalEP');				
		} else if (pSubSection == 'ATI') {
			loadHTML('EP/ATI.html','PrincipalEP');				
		} else if (pSubSection == 'CINTERSAN') {
			loadHTML('EP/CINTERSAN.html','PrincipalEP');				
		}
	} else if (pSection == 'Ed') {
		loadHTML('Ed/Main.html','PrincipalWide');
		loadHTML('Ed/SubMenu.html','SubMenuEd');
		hideSection('contentSection1EP');
		hideSection('contentSection2EP');
		hideSection('contentSection1Base');
		hideSection('contentSection2Base');
		hideSection('contentSection1Prj');
		hideSection('contentSection2Prj');
		hideSection('SubMenuBase');
		hideSection('SubMenuEP');
		hideSection('SubMenuSk');
		hideSection('SubMenuCrt');
		hideSection('SubMenuPrj');
		showSection('SubMenuEd');
		showSection('contentSection3');
	} else if (pSection == 'Sk') {
		loadHTML('Sk/Main.html','PrincipalWide');
		loadHTML('Sk/SubMenu.html','SubMenuSk');
		hideSection('contentSection1EP');
		hideSection('contentSection2EP');
		hideSection('contentSection1Base');
		hideSection('contentSection2Base');
		hideSection('contentSection1Prj');
		hideSection('contentSection2Prj');
		hideSection('SubMenuBase');
		hideSection('SubMenuEP');
		hideSection('SubMenuEd');
		hideSection('SubMenuCrt');
		hideSection('SubMenuPrj');
		showSection('SubMenuSk');
		showSection('contentSection3');
	} else if (pSection == 'Crt') {
		loadHTML('Cert/Main.html','PrincipalWide');
		loadHTML('Cert/SubMenu.html','SubMenuCrt');
		hideSection('contentSection1EP');
		hideSection('contentSection2EP');
		hideSection('contentSection1Base');
		hideSection('contentSection2Base');
		hideSection('contentSection1Prj');
		hideSection('contentSection2Prj');
		hideSection('SubMenuBase');
		hideSection('SubMenuEP');
		hideSection('SubMenuEd');
		hideSection('SubMenuSk');
		hideSection('SubMenuPrj');
		showSection('SubMenuCrt');
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
		//else {
		//	console.log ("not set  " + " pSection: " + pSection + "   pSubSection: " + pSubSection);
		//}
		//filterCerts('All');

	} else if (pSection == 'Prj') {
		loadHTML('Prj/Menu.html','MenuPrj');
		loadHTML('Prj/SubMenu.html','SubMenuPrj');
		loadHTML('Prj/QPS.html','PrincipalPrj');
		hideSection('contentSection3');
		hideSection('contentSection1EP');
		hideSection('contentSection2EP');
		hideSection('contentSection1Base');
		hideSection('contentSection2Base');
		hideSection('SubMenuBase');
		hideSection('SubMenuEP');
		hideSection('SubMenuEd');
		hideSection('SubMenuSk');
		hideSection('SubMenuCrt');
		showSection('SubMenuPrj');
		showSection('contentSection1Prj');
		showSection('contentSection2Prj');
		if (pSubSection == 'QPS') {
			loadHTML('Prj/QPS.html','PrincipalPrj');
		} else if (pSubSection == 'PMKTSOT') {
			loadHTML('Prj/PMKTSOT.html','PrincipalPrj');		
		} else if (pSubSection == 'PT') {
			loadHTML('Prj/PT.html','PrincipalPrj');
		} else if (pSubSection == 'CT') {
			loadHTML('Prj/CT.html','PrincipalPrj');
		} else if (pSubSection == 'AGILE') {
			loadHTML('Prj/AGILE.html','PrincipalPrj');
		} else if (pSubSection == 'EC') {
			loadHTML('Prj/EC.html','PrincipalPrj');
		} else if (pSubSection == 'DA') {
			loadHTML('Prj/DA.html','PrincipalPrj');
		} else if (pSubSection == 'MDM') {
			loadHTML('Prj/MDM.html','PrincipalPrj');
		} else if (pSubSection == 'TT') {
			loadHTML('Prj/TT.html','PrincipalPrj');
		}
	}
}

function showSection(sectionId) {
    document.getElementById(sectionId).style.display = 'block';
}

function hideSection(sectionId) {
    document.getElementById(sectionId).style.display = 'none';
}
