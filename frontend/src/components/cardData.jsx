import './cardData.css';


function CardData({ data }) {
    return (
      <div className='cardContainer px-0'>
          <div className='cardTop d-flex justify-content-center align-items-center'>
            <div className='text'>{data?.food_name ? `😋 ${data.food_name}` : 'Nutrition Info'} </div>
          </div>

          <div className='cardBottom d-flex justify-content-center align-items-center flex-column'>

            {data && (
              <div>
                
                {data?.g100 && (
                  <div className='subHeading pb-4'>⚖️ Total 100g calories
                    <div className='indivEntry'>🥩 {data.g100.protein_cal_100g || '0'} kcal protein</div>
                    <div className='indivEntry'>🍙 {data.g100.carb_cal_100g || '0'} kcal carb</div>
                    <div className='indivEntry'>🧈 {data.g100.fat_cal_100g || '0'} kcal fats</div>
                  </div>
                )}

                {data?.total && (
                  <div className='subHeading'>🍲 Total calories {data.total.total_cal} kcal 
                    <div className='indivEntry'>🍖 {data.total.protein_cal || '0'} kal protein</div>
                    <div className='indivEntry'>🥙 {data.total.carb_cal || '0'} kal carb</div>
                    <div className='indivEntry'>🐖 {data.total.fat_cal || '0'} kal fat</div>
                  </div>
                )}

              </div>
            )}

          </div>
      </div>  
    );
}


export default CardData;