const chirag_table=document.querySelector('table');
let chirag_counter=3;

getRandomColor();

function getRandomColor() {
    
    let chirag_r = getRandomValue(0,180);
    let chirag_g = getRandomValue(0,180);
    let chirag_b = getRandomValue(0,180);
    let chirag_a = 1;
    
    let chirag_allTD=[...document.querySelectorAll('table td')];

    let chirag_totalTD=chirag_allTD.length;

    //put random color in all td
    chirag_allTD.forEach(chirag_td=>{
        chirag_td.style.backgroundColor=`rgba(${chirag_r},${chirag_g},${chirag_b},${chirag_a})`;
    });

    chirag_a=0.5;

    //selecting any one td randomly and light the color
    let chirag_randomHighlightedCellIndex=getRandomValue(0,chirag_totalTD);
    chirag_allTD[chirag_randomHighlightedCellIndex].style.backgroundColor=`rgba(${chirag_r},${chirag_g},${chirag_b},${chirag_a})`;
    
    //binding click event to that lightCell
    chirag_allTD[chirag_randomHighlightedCellIndex].addEventListener('click',generateTabel,{once:true});



}

function getRandomValue(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateTabel(){
    chirag_counter++;

    if(chirag_counter===9){
        window.location.reload();
    }

    let chirag_Root=document.querySelector(":root");
    const chirag_obj=window.getComputedStyle(chirag_Root);
    let chirag_px=chirag_obj.getPropertyValue('--cell-size');

    let chirag_get_val=Number(chirag_px.slice(0,-2));
    
    chirag_minus_factor=(chirag_counter*2);

    chirag_Root.style.setProperty('--cell-size', `${chirag_get_val-chirag_minus_factor}px`);
    
    
    

    let chirag_tab_tenplate="";

    for (let chirag_row = 0; chirag_row < chirag_counter; chirag_row++) {

        chirag_tab_tenplate+="<tr>";

        for (let chirag_col = 0; chirag_col < chirag_counter; chirag_col++) {
            chirag_tab_tenplate+="<td></td>";
        }

        chirag_tab_tenplate+="</tr>";
        
    }

    chirag_table.innerHTML=chirag_tab_tenplate;

    getRandomColor();
    
}


document.addEventListener('contextmenu',function(e){
    e.preventDefault();
})

chirag_table.addEventListener('mousedown', function (e) {
    
    let chirag_btn = e.button;
    switch (chirag_btn) {  
        case 2:
            getRandomColor();
            break;
    }

});