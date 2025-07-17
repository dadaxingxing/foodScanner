import './cardData.css';


function CardData({ data }) {
    return (
      <div className='cardContainer px-0'>
          <div className='cardTop d-flex justify-content-center align-items-center'>
            <div className='text'>Nutrition Info</div>
          </div>


          {data && (
            <div className='cardContent'>
            
              {data?.food_name && (
                <div>😋{data.food_name}</div>
              )}
              
              {data?.g100 && (
                <div>⚖️ Total 100g calories
                  <div>🥩 {data.g100.protein_cal_100g} protein</div>
                  <div>🍙 {data.g100.carb_cal_100g} carb</div>
                  <div>🧈 {data.g100.fat_cal_100} fats</div>
                </div>
              )}

              {data?.total && (
                <div>🍲 {data.total.total_cal}
                  <div>🍖 {data.total.protein_cal}</div>
                  <div>🥙 {data.total.carb_cal}</div>
                  <div>🐖 {data.total.fat_cal}</div>
                </div>
              )}

            </div>
          )}
      </div>  
    );
}


export default CardData;