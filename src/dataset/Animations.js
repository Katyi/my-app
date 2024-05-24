

export const AOS_INITIAL_OPTIONS = {
    offset:10,
    anchorPlacement: 'top-top'
}
export const AOS_INTRO_BLOCK = {
    'data-aos':"fade",
    'data-aos-duration':"1000",
    'data-aos-once':"true",
    'data-aos-anchor-easing':'ease-in-out',
    //  'data-aos-anchor-placement':"center-center",
}
export const AOS_INTRO_IMAGE = (number,opposit=false)=>{
    const isEven = +number%2===0
    return {
        'data-aos':`fade-${!opposit?'up':'down'}-${!isEven?'left':'right'}`,
        'data-aos-easing':"linear",
        'data-aos-anchor-easing':'ease-in-out',
        'data-aos-duration':"1000",
        //  'data-aos-anchor-placement':"top-bottom",
    }
}
export const AOS_LOADER_BLOCK = {
    'data-aos':"fade",
    'data-aos-duration':"500",
    'data-aos-once':"true",
    'data-aos-anchor-easing':'ease-in-out',
    //  'data-aos-anchor-placement':"center-center",
}
export const AOS_POST_BLOCK = {
    'data-aos':"fade-up",
    // 'data-aos-once':"true",
    'data-aos-anchor-easing':'ease-in-out',
    // 'data-aos-duration':"1000",
     'data-aos-anchor-placement':"top-bottom",
}