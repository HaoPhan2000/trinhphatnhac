const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd=$(".cd")
const heading=$("#heading-namesong")
const cdThumb=$(".cd-thumb")
const audio=$("#audio")
const play=$(".player")
const btnPlay=$(".btn-toggle-play")
const progress=$("#progress")
const btnPrev=$(".btn-prev")
const btnNext=$(".btn-next")
const btnRandom=$(".btn-random")
const btnRepeat=$(".btn-repeat")
const playlist=$(".playlist")
const timeRight=$(".time-right")
const timeLeft=$(".time-left")
const PLAYER_STORAGE_KEY="App nghe nhac"

  const app={
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    //tạo ra cái kho để lưu trữ data local
    config:JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: [
        {
          name: "Dấu Mưa",
          singer: "Trung Quân",
          path: "./musics/music/Dau Mua - Trung Quan.flac",
          image: "./musics/img/dau-mua.jpg"
        },
        {
          name: "Thu cuối",
          singer: "Yanbi",
          path: "./musics/music/Thu Cuoi - Yanbi_ Mr_T_ Hang BingBoong.mp3",
          image:"./musics/img/thu-cuoi.jpg"
        },
        {
          name: "Anh đếch cần gì ngoài em",
          singer: "Đen Vâu",
          path:"./musics/music/Anh Dech Can Gi Nhieu Ngoai Em - Den_ Vau.flac",
          image: "./musics/img/anh-dech-can-gi nhieu- ngoai-em.jpg"
        },
        {
          name: "Khi người lớn cô đơn",
          singer: "Phạm Hồng Phước",
          path: "./musics/music/Khi Nguoi Lon Co Don - Pham Hong Phuoc.flac",
          image:"./musics/img/khi-nguoi-lon-co-don.jpg"
        },
        {
          name: "Dấu Mưa",
          singer: "Trung Quân",
          path: "./musics/music/Dau Mua - Trung Quan.flac",
          image: "./musics/img/dau-mua.jpg"
        },
        {
          name: "Thu cuối",
          singer: "Yanbi",
          path: "./musics/music/Thu Cuoi - Yanbi_ Mr_T_ Hang BingBoong.mp3",
          image:"./musics/img/thu-cuoi.jpg"
        },
        {
          name: "Anh đếch cần gì ngoài em",
          singer: "Đen Vâu",
          path:"./musics/music/Anh Dech Can Gi Nhieu Ngoai Em - Den_ Vau.flac",
          image: "./musics/img/anh-dech-can-gi nhieu- ngoai-em.jpg"
        },
        {
          name: "Khi người lớn cô đơn",
          singer: "Phạm Hồng Phước",
          path: "./musics/music/Khi Nguoi Lon Co Don - Pham Hong Phuoc.flac",
          image:"./musics/img/khi-nguoi-lon-co-don.jpg"
        },
        {
          name: "Dấu Mưa",
          singer: "Trung Quân",
          path: "./musics/music/Dau Mua - Trung Quan.flac",
          image: "./musics/img/dau-mua.jpg"
        },
        {
          name: "Thu cuối",
          singer: "Yanbi",
          path: "./musics/music/Thu Cuoi - Yanbi_ Mr_T_ Hang BingBoong.mp3",
          image:"./musics/img/thu-cuoi.jpg"
        },
        {
          name: "Anh đếch cần gì ngoài em",
          singer: "Đen Vâu",
          path:"./musics/music/Anh Dech Can Gi Nhieu Ngoai Em - Den_ Vau.flac",
          image: "./musics/img/anh-dech-can-gi nhieu- ngoai-em.jpg"
        },
        {
          name: "Khi người lớn cô đơn",
          singer: "Phạm Hồng Phước",
          path: "./musics/music/Khi Nguoi Lon Co Don - Pham Hong Phuoc.flac",
          image:"./musics/img/khi-nguoi-lon-co-don.jpg"
        },
        {
          name: "Dấu Mưa",
          singer: "Trung Quân",
          path: "./musics/music/Dau Mua - Trung Quan.flac",
          image: "./musics/img/dau-mua.jpg"
        },
        {
          name: "Thu cuối",
          singer: "Yanbi",
          path: "./musics/music/Thu Cuoi - Yanbi_ Mr_T_ Hang BingBoong.mp3",
          image:"./musics/img/thu-cuoi.jpg"
        },
        {
          name: "Anh đếch cần gì ngoài em",
          singer: "Đen Vâu",
          path:"./musics/music/Anh Dech Can Gi Nhieu Ngoai Em - Den_ Vau.flac",
          image: "./musics/img/anh-dech-can-gi nhieu- ngoai-em.jpg"
        },
        {
          name: "Khi người lớn cô đơn",
          singer: "Phạm Hồng Phước",
          path: "./musics/music/Khi Nguoi Lon Co Don - Pham Hong Phuoc.flac",
          image:"./musics/img/khi-nguoi-lon-co-don.jpg"
        },
      ],
    //tạo phương thức để lưu trữ dữ liệu
      setConfig:function(key,value){
        this.config[key]=value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
      },
    //render ra danh sách bài hát
    render:function(){
        const htmls=this.songs.map((song,index)=>{
            return`
            <div class="song ${index===this.currentIndex?"active":""}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        playlist.innerHTML=htmls.join("")
    },
    //lắng nghe sự kiện scroll chuột
    handleEventScroll:function(){
        const cdWidth=cd.offsetWidth
        document.onscroll=function(){
            const scrollTop=window.scrollY||document.documentElement.scrollTop
            //console.log(scrollTop)
            const newCdWidth=cdWidth-scrollTop
            //console.log("width mới:"+newCdWidth)
            cd.style.width=newCdWidth>0?newCdWidth+"px":0
            const wAP=newCdWidth>0?newCdWidth+"px":0
            //console.log("width áp dụng:"+wAP)
            cd.style.opacity=newCdWidth/cdWidth>0?newCdWidth/cdWidth:0
            const oAP=newCdWidth/cdWidth>0?newCdWidth/cdWidth:0
            //console.log("opacity mới:"+newCdWidth/cdWidth)
            //console.log("opacity áo dụng:"+oAP)

        }
    },
    //lấy ra bài hát
    getCurrentSong:function(){
      return this.songs[this.currentIndex]
    },
    //load nội dung bài hát
    loadCurrentSong:function(){
      heading.textContent=this.getCurrentSong().name
      cdThumb.style.backgroundImage=`url("${this.getCurrentSong().image}")`
      audio.src=this.getCurrentSong().path
    },
    //sử lý sự kiện play và cd quay tròn
    handleEventPlay:function(){
      const cdThumbAnimate=cdThumb.animate([{transform:"rotate(360deg)"}],{duration:10000,iterations:Infinity})
      cdThumbAnimate.pause()
      btnPlay.onclick=function(){
        if(app.isPlaying==false)
        {
          audio.play()
        }
        else
        {
          audio.pause()
        }
        //khi audi phát thì...
        audio.onplay=function(){
          app.isPlaying=true
          play.classList.add("playing")
          cdThumbAnimate.play()
        } 
        //khi audio dừng thì...
        audio.onpause=function(){
          app.isPlaying=false
          play.classList.remove("playing")
          cdThumbAnimate.pause()
        }
        //next bài hát tự động khi kết thúc 
        audio.onended=function(){   
          setTimeout(function(){
            if(app.isRepeat)
            {
              audio.play()
            }
            else
            {
              if(app.isRandom)
              {
                app.RandomSong()
                audio.play()
                app.handleActiveSong()
                app.scrollToActiveSong()
              }
              else
              {
                app.nextSong()
                audio.play()
                app.handleActiveSong()
                app.scrollToActiveSong()
              }
            }
          },1000)
        }
      }
    },
    // Hàm này có tác dụng chuyển những số bé hơn 10 thành dạng 01, 02, 03, ...
    checkTime:function(i){
      if (i < 10) {
        i = "0" + i;
    }
    return i;
    },
    //Tổng thời gian bài hát
    getTotalTimeSong:function(){
      audio.onloadedmetadata =function(){
        const floorTime=Math.floor(audio.duration)
        const h=Math.floor(floorTime/3600)
        const m=Math.floor((floorTime%3600)/60)
        const s=Math.floor((floorTime%3600)%60)

        const hour=h
        const minute=app.checkTime(m)
        const second=app.checkTime(s)
        if(floorTime>=3600)
        {
          timeRight.textContent=`${hour}:${minute}:${second}`
        }
        else
        {
          timeRight.textContent=`${minute}:${second}`
        }
      }
    },
    //hàm sử lý mốc thời gian bài hát(thanh progress và đồng hồ đếm giờ theo thời gian bài hát)
    handleTimeSong:function(){
      audio.ontimeupdate=function(){
        if(audio.duration){
          //thanh progress
          const progressPercent=Math.floor(audio.currentTime/audio.duration*100)
          progress.value=progressPercent  
          //đồng hồ đếm giờ
          const time=Math.floor(audio.currentTime)
          const h=Math.floor(time/3600)
          const m=Math.floor((time%3600)/60)
          const s=Math.floor((time%3600)%60)
  
          const hour=h
          const minute=app.checkTime(m)
          const second=app.checkTime(s)
          if(time>=3600)
          {
            timeLeft.textContent=`${hour}:${minute}:${second}`
          }
          else
          {
            timeLeft.textContent=`${minute}:${second}`
          }
        }
      }
    },
    //hàm sử lý tua bài hát
    handleEventProgress:function(){
      progress.oninput =function(e){
      audio.currentTime=(audio.duration*e.target.value/100)
      //audio.duration:Tổng giây của bài hát
      //e.target.value:% của progress
      }
    },
    //hàm next bài hát
    nextSong:function(){
      this.currentIndex++
      const lenghthSongs=this.songs.length
      if(this.currentIndex>=lenghthSongs)
      {
        this.currentIndex=0
      }
      this.loadCurrentSong()
    },
    //hàm prev bài hát
    PrevSong:function(){
      this.currentIndex--
      const lenghthSongs=this.songs.length
      if(this.currentIndex<0)
      {
        this.currentIndex=lenghthSongs-1
      }
      this.loadCurrentSong()
    },
    //Hàm random bài hát
    RandomSong:function(){
      let newCurrentIndex
        do{newCurrentIndex=Math.floor(Math.random()*this.songs.length)
        }while(newCurrentIndex===this.currentIndex)
        this.currentIndex=newCurrentIndex
        this.loadCurrentSong()
    },
    //hàm sử lý active bài hát
    handleActiveSong:function(){
      const songActive=$(".song.active")
      //xóa active
      songActive.classList.remove("active")
      const songs=$$(".song")
      //songs lấy ra là một là một node list cần thành array để làm việc với find()
      let arr = Array.from(songs)
      const activeSong=arr.find(function(currentValue, index, arr){
        return index==app.currentIndex
        })
      //add lớp active
      activeSong.classList.add("active")  
    },
    //hàm sử lý scroll đến bài hát
    scrollToActiveSong:function(){
      setTimeout(()=>{
        $(".song.active").scrollIntoView({
          behavior:"smooth",
          block:"end"
        })
      },200)
    },
    //hàm sử lý sự kiện click dang sách bài hát
    handleEventClickPlayList:function(){
      playlist.onclick=function(e){
        if(e.target.closest(".option"))
        {
         alert("Coming soon")
        }
        else
        {
          if(e.target.closest(".song:not(.active)"))
          {
            app.currentIndex=Number(e.target.closest(".song:not(.active)").dataset.index)
            app.handleActiveSong()
            app.loadCurrentSong()
            if(app.isPlaying)
            {
              audio.play()
            }
            else
            {
              btnPlay.click()
            }
          }
        }
      }
    },
    //hàm load local storage
    loadLocalStorage:function(){
      this.isRandom=this.config.isRandom
      this.isRepeat=this.config.isRepeat
    },
    //hàm active button theo data local storage
    activeButtun:function(){
      if(this.isRandom){
        btnRandom.classList.toggle("active")
      }
      if(this.isRepeat){
        btnRepeat.classList.toggle("active")
      }
    },
    //hàm sử lý các nút điều khiển
    handleEventControl:function(){
      //nhấn nút next
      btnNext.onclick=function(){
        if(app.isPlaying)
        {
          if(app.isRandom)
          {
            app.RandomSong()
            audio.play()
            app.handleActiveSong()
            app.scrollToActiveSong()
          }
          else
          {
            app.nextSong()
            audio.play()
            app.handleActiveSong()
            app.scrollToActiveSong()
          }
        }
        else
        {
          if(app.isRandom)
          {
            app.RandomSong()
            app.handleActiveSong()
            app.scrollToActiveSong()
          }
          else
          {
            app.nextSong()
            app.handleActiveSong()
            app.scrollToActiveSong()
          }
        }
      }
      //nhấn nút Prev
      btnPrev.onclick=function(){
        if(app.isPlaying)
        {
          if(app.isRandom)
          {
            app.RandomSong()
            audio.play()
            app.handleActiveSong()
            app.scrollToActiveSong()
          }
          else
          {
            app.PrevSong()
            audio.play()
            app.handleActiveSong()
            app.scrollToActiveSong()
          }
        }
        else
        {
          if(app.isRandom)
          {
            app.RandomSong()
            app.handleActiveSong()
            app.scrollToActiveSong()
          }
          else
          {
            app.PrevSong()
            app.handleActiveSong()
            app.scrollToActiveSong()
          }
        }
      }
      //nhấn nút Random
      btnRandom.onclick=function(){
        app.isRandom=!app.isRandom
        //add dữ liệu vào kho
        app.setConfig("isRandom",app.isRandom)
        btnRandom.classList.toggle("active")
      }
      //nhấn nút Repeat
      btnRepeat.onclick=function(){
        app.isRepeat=!app.isRepeat
         //add dữ liệu vào kho
        app.setConfig("isRepeat",app.isRepeat)
        btnRepeat.classList.toggle("active")
      }

    },
    //Hàm khởi tạo
    main:function(){
        this.loadLocalStorage()
        this.activeButtun()
        this.render()
        this.handleEventScroll()
        this.getCurrentSong()
        this.loadCurrentSong()
        this.getTotalTimeSong()
        this.handleEventPlay()
        this.handleTimeSong()
        this.handleEventProgress()
        this.handleEventControl()
        this.handleEventClickPlayList()
    }
  }
 app.main()