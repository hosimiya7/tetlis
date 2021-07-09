const game_speed = 1000

    // フィールドのサイズ
    const field_col = 10
    const field_row = 20

    const block_size = 30
    // スクリーンサイズ
    const screen_width = block_size * field_col
    const screen_height = block_size * field_row
    // テトロミノのサイズ
    const tetro_size = 4

    let can = document.getElementById("can")
    let con = can.getContext("2d")//コンテキストとは
    // キャンバスに備わっているもの
    can.width = screen_width
    can.height = screen_height
    can.style.border = "4px solid #555"

    // テトロミノの座標
    let tetro_x = 0;
    let tetro_y = 0;
    // フィールド本体
    let field = []

    // 初期化
    function init(){
        for(let y=0; y<field_row; y++){
            field[y] = []
            for(let x=0; x<field_col; x++){
                field[y][x] = 0
            }
        }
        // test
        field[5][8] = 1
        field[19][0] = 1
        field[19][9] = 1
    }

    // テトロミノ本体
    let tetro = [
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0],
    ]

    init()
    drawAll()

    // setInterval(dropTetro, game_speed)

    // ブロック一つ描画する
    function drawBlock(x, y){
        let print_x = x * block_size
        let print_y = y * block_size

        con.fillStyle="red"
        con.fillRect(print_x,print_y,block_size,block_size)//座標と大きさ
        con.strokeStyle="black"
        con.strokeRect(print_x,print_y,block_size,block_size)
    }

    function drawAll(){
        con.clearRect(0,0,screen_width, screen_height)
        for(let y=0; y<field_row; y++){
            for(let x=0; x<field_col; x++){
                if(field[y][x]){
                    drawBlock(x, y)
                }
            }
        }
        for(let y=0; y<tetro_size; y++){
            for(let x=0; x<tetro_size; x++){
                if(tetro[y][x]){
                    drawBlock(tetro_x + x, tetro_y + y)
                }
            }
        }
    }

    // 動けるかどうか
    function checkMove(mx, my, ntetro){
        if(ntetro === undefined){
            ntetro = tetro
        }
        for(let y=0; y<tetro_size; y++){
            for(let x=0; x<tetro_size; x++){
                let nx = tetro_x + mx + x
                let ny = tetro_y + my + y
                if(ntetro[y][x]){
                    if(field[ny][nx] ||
                        nx < 0 ||
                        ny < 0 ||
                        ny >= field_row ||
                        nx >= field_col){
                        return false
                    }
                }
            }
        }
        return true
    }

    // テトロミノの回転
    function rotate(){
        let ntetro = []
        for(let y=0; y<tetro_size; y++){
            ntetro[y] = []
            for(let x=0; x<tetro_size; x++){
                ntetro[y][x] = tetro[tetro_size-x-1][y]
            }
        }
        return ntetro
    }

    function dropTetro(){
        if(checkMove(0, 1)){
            tetro_y ++;
        }
    }

    // キーボードが押された時の処理
    document.onkeydown = function(e){
        // onkeydown keycode 検索
        switch( e.keyCode ){
            case 37://左
                if(checkMove(- 1, 0)){
                    tetro_x --;
                }
                break;
            case 38://上
                if(checkMove(0, -1)){
                    tetro_y --;
                }
                break;
            case 39://右
                if(checkMove(1, 0)){
                    tetro_x ++;
                }
                break;
            case 40://下
                if(checkMove(0, 1)){
                    tetro_y ++;
                }
                break;
            case 32://スペース
            let ntetro = rotate()
            if(checkMove(0, 0, ntetro)){
                tetro = ntetro
            }
                break;
        }
        drawAll()
    }
