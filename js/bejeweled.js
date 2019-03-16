
//Rendering of grid/matrix
    $(document).ready(function(){
      let tileColor = ['red', 'orange', 'yellow', 'blue', 'indigo', 'violet'];
        var tile = 1;
        //looping through 7 columns and rows
        for (var r=0; r<7; r++) {
            var col = "";
            for (var c=0; c<7; c++) {
              //adding table cells
                col += "<td></td>";
                tile++;
            }
            //adding columns
        $("#Bejeweled").append("<tr>"+col+"</tr>");
    }
    //I couldnt figure out how to compare colors so I created an extra matrix
    //to compare tile color array indices instead
    let checkMatrix = [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ]
    //targeted entire game grid
    let grid = document.getElementById('Bejeweled');
    let rowLength = grid.rows[0].cells.length;
    //I need to loop through the grid to compare color indices of each cell
    for (let i = 0; i < rowLength; i++) {
      for (let j = 0; j < rowLength; j++) {
        //I am initiliazing the color indices into checkMatrix
         checkMatrix[i][j] = Math.floor(Math.random() * tileColor.length);
         //checking boundaries to avoid index out of bounds
         let canGoLeft = (j > 1);
         let canGoUp = (i > 1);
         let currColor = checkMatrix[i][j];

         if (canGoUp || canGoLeft) {
           //intiliaze variables so I can use it later without breaking
           //the while loop
           let leftColor1 = null;
           let leftColor2 = null;
           let upColor1 = null;
           let upColor2 = null;
           let brokenLeft = null;
           let brokenUp = null;
           if (canGoLeft) {
             leftColor1 = checkMatrix[i][j-1];
             leftColor2 = checkMatrix[i][j-2];
             brokenLeft = (currColor === leftColor1 && currColor === leftColor2);
           }
           if (canGoUp) {
             upColor1 = checkMatrix[i-1][j];
             upColor2 = checkMatrix[i-2][j];
             brokenUp = (currColor === upColor1 && currColor === upColor2);
           }
           while (brokenLeft || brokenUp) {
             //if match 3 I assign the current color to the new randomized color
             let newColor = Math.floor(Math.random() * tileColor.length);
             currColor = newColor
             //if new randomized color is still matching then repeat loop
             brokenLeft = (currColor === leftColor1 && currColor === leftColor2);
             brokenUp = (currColor === upColor1 && currColor === upColor2);
           }
           checkMatrix[i][j] = currColor;
         }
         //if here, not broken left and not broken up -> working!
         grid.rows[i].cells[j].bgColor = tileColor[checkMatrix[i][j]];
      }
    }
});
