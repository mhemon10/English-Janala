const lessonBtnBox=document.querySelector('#lesson-btn-box');
const lessonBox=document.querySelector('#lesson-box');
const userName=document.querySelector('#username');
const password=document.querySelector('#pass');
const loginBtn=document.querySelector('#login');
const hidejs=document.querySelectorAll('.hidejs');
const hero=document.querySelector('#hero-section');
const logoutBtn=document.querySelector('#logout');
const loader=document.querySelector('#loader');
const navMenu=document.querySelector('#nav-menu');
const navLinks=document.querySelector('#nav-links');
const closeBtn=document.querySelector('#nav-close');

const showLoader=()=>{
    loader.classList.remove("hidden");
    loader.classList.add("flex");
    lessonBox.classList.add("hidden");
}
const hideLoader=()=>{
    loader.classList.remove("flex");
    loader.classList.add("hidden");
    lessonBox.classList.remove("hidden");
}

fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(data=>{loadButtons(data.data)});

const loadButtons=(datas)=>{
    for(let data of datas){
        const div=document.createElement('div');
        div.innerHTML=`<button class="text-sm max-md:text-xs font-semibold poppins px-4 py-2 text-[#422AD5] hover:bg-[#422AD5] hover:text-white cursor-pointer rounded-md border border-[#422AD5]"><i class="fa-solid fa-book-open"></i> Lesson -${data.level_no}</button>`;
        div.addEventListener('click',(event)=>{
            showLoader();
            fetch(`https://openapi.programming-hero.com/api/level/${data.level_no}`)
                .then(res=>res.json())
                .then(data=>{loadLessons(data.data)});
            event.target.classList.add('active');                                                                                                                   
            document.querySelectorAll('.active').forEach((activeBtn)=>{
                if(activeBtn!=event.target){
                    activeBtn.classList.remove('active');
                }
            });
        });
        lessonBtnBox.appendChild(div);

    }
}
const loadLessons=(lessons)=>{
    lessonBox.innerHTML="";
    if(lessons.length==0){
        const div=document.createElement('div');
        div.className="flex flex-col gap-4 items-center justify-center py-16 col-span-full";
        div.innerHTML=`
            <img src="assets/alert-error.png" alt="error">
            <h4 class="hind-siliguri text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h4>
            <h2 class="text-4xl font-medium hind-siliguri">নেক্সট Lesson এ যান</h2>
        `
        lessonBox.appendChild(div);
        hideLoader();
        return;
    }
    for(let lesson of lessons){
        const div=document.createElement('div');
        div.className="px-12 py-14 bg-white rounded-xl shadow-md";
        div.innerHTML=`
            <div class="flex flex-col gap-6 items-center mb-14">
                    <p class="text-3xl font-bold inter">${lesson.word}</p>
                    <p class="inter text-xl font-medium">Meaning /Pronounciation</p>
                    <p class="hind-siliguri text-3xl font-semibold">"${lesson.meaning==null?"অর্থ নেই":lesson.meaning} / ${lesson.pronunciation}"</p>
                </div>
                <div class="flex justify-between">
                    <span onclick="loadModal(${lesson.id})" class="p-4 cursor-pointer rounded-lg bg-slate-100 hover:bg-slate-200"><i class="fa-solid text-xl fa-circle-info"></i></span>
                    <span class="p-4 cursor-pointer rounded-lg bg-slate-100 hover:bg-slate-200"><i class="text-xl fa-solid fa-volume-high"></i></span>
            </div>
        `;
        lessonBox.appendChild(div);
        hideLoader();
    }
}
const loadModal=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        .then(res=>res.json())
        .then(data=>{showModal(data.data)});
}
const showModal=(detail)=>{
    document.querySelector("#word_details").showModal();
    let synonyms=detail.synonyms;
    document.querySelector(".modal-box").innerHTML=`
        <div class="p-6 border border-[#EDF7FF] rounded-xl max-md:flex max-md:flex-wrap max-md:flex-col" id="mod-box">
            <h2 class="text-4xl font-semibold poppins mb-8 max-md:text-2xl">${detail.word} (<i class="fa-solid fa-microphone"></i> :${detail.pronunciation})</h2>
            <h4 class="text-2xl font-semibold poppins mb-2">Meaning</h4>
            <p class="hind-siliguri text-2xl font-medium mb-8">${detail.meaning==null?"অর্থ পাওয়া যায়নি":detail.meaning}</p>
            <p class="text-2xl font-semibold poppins mb-2">Example</p>
            <p class="text-2xl poppins mb-8">${detail.sentence}</p>
            <p class="text-2xl font-medium mb-3 hind-siliguri">সমার্থক শব্দ গুলো</p>
        </div>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
        </div>    
    `;
    for(let synonym of synonyms){
        const span=document.createElement('span');
        span.className="px-5 ml-1.5 py-1.5 rounded-md bg-[#EDF7FF] text-xl poppins mt-1.5";
        span.innerText=synonym;
        document.querySelector("#mod-box").appendChild(span);
    }
}

loginBtn.addEventListener('click',()=>{
    if(userName.value){
        if(password.value==123456){
            for(let hide of hidejs){
                hide.classList.remove('hidden');
                hero.classList.add('hidden');
            }
        }
        else{
            alert("Wrong Password! Contact Admint to get your Login Code");
            userName.value="";
            password.value="";
        }
    }else{
        alert("Please Enter Your Username First");
        userName.value="";
        password.value="";
    }
});

logoutBtn.addEventListener("click",()=>{
    for(let hide of hidejs){
        hide.classList.add('hidden');
        hero.classList.remove('hidden');
    }
    userName.value="";
    password.value="";
});

navMenu.addEventListener('click',()=>{
    navLinks.classList.remove('max-md:hidden');
    navMenu.style.display="none";
    closeBtn.style.display="block";
});
closeBtn.addEventListener("click",()=>{
    navLinks.classList.add('max-md:hidden');
    navMenu.style.display="block";
    closeBtn.style.display="none";
})