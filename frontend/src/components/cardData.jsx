import './cardData.css';


function CardData({ data }) {
    return (
      <div className='cardContainer px-0'>
          <div className='cardTop d-flex justify-content-center align-items-center'>
            <div className='text'>Nutrition Info</div>
          </div>

          <div className='cardBottom d-flex justify-content-center align-items-center flex-column'>

            {data && (
              <div>
              
                {data?.food_name && (
                  <div className='foodName'>😋 {data.food_name}</div>
                )}
                
                {data?.g100 && (
                  <div>⚖️ Total 100g calories
                    <div>🥩 {data.g100.protein_cal_100g || '0'} kcal protein</div>
                    <div>🍙 {data.g100.carb_cal_100g || '0'} kcal carb</div>
                    <div>🧈 {data.g100.fat_cal_100g || '0'} kcal fats</div>
                  </div>
                )}

                {data?.total && (
                  <div>🍲 Total calories {data.total.total_cal} kcal 
                    <div>🍖 {data.total.protein_cal || '0'} kal protein</div>
                    <div>🥙 {data.total.carb_cal || '0'} kal carb</div>
                    <div>🐖 {data.total.fat_cal || '0'} kal fat</div>
                  </div>
                )}

              </div>
            )}

          </div>
      </div>  
    );
}


export default CardData;