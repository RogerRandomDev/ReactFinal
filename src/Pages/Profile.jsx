import ProductCard from "../Components/ProductCard";
import ProfileInfoCard from "../Components/ProfileInfoCard";
import PurchaseReceipt from "../Components/PurchaseReceipt";
import RecentPurchases from "../Components/RecentPurchases";
import ResponsiveGridDisplay from "../Components/ResponsiveGridDisplay";
import RowDisplay from "../Components/RowDisplay";

function Profile() {
  return (
    <div className="flex flex-col gap-12 py-8 px-20">
    <div className="flex gap-12 items-center">
    <ProfileInfoCard image={"https://picsum.photos/400"} username={"Rory Seekamp"} joinDate={new Date().toDateString()} location={"Phoenix, AZ"} rating={4} ratingCount={53} bought={6} sold={17}/>
    {/* Favorited items must come from database, so props are just placeholders for now */}
    <div className="border-l pl-12">
        <RowDisplay title={"Favorited Items"}>
    <ProductCard type="favorite" favoritePreset={true} image={"https://picsum.photos/400?random=1"} title={"Nike Dunk Low Olive"} price={200} location={"Phoenix, AZ"} link={"#"}/>
    <ProductCard type="favorite" favoritePreset={true} image={"https://picsum.photos/400?random=2"} title={"Nike High Top Jordans"} price={470} location={"Santa Barbara, CA"} link={"#"}/>
    <ProductCard type="favorite" favoritePreset={true} image={"https://picsum.photos/400?random=3"} title={"Adidas Predator Cleats"} price={125} location={"Berkeley, CA"} link={"#"}/>
    <ProductCard type="favorite" favoritePreset={true} image={"https://picsum.photos/400?random=4"} title={"Louis Vuitton Nike Lows"} price={775} location={"Raeleigh, NC"} link={"#"}/>
    <ProductCard type="favorite" favoritePreset={true} image={"https://picsum.photos/400?random=5"} title={"Xbox Gaming Controller"} price={50} location={"Salt Lake City, UT"} link={"#"}/>
    </RowDisplay>
    </div>
    </div>
    <div className="px-20">
    <ResponsiveGridDisplay title={"Items From This Seller"}>
        {new Array(25).fill().map((_,idx)=>{
            return <ProductCard image={`https://picsum.photos/400?random=${idx+6}`} title={"Xbox Gaming Controller"} price={50} location={"Salt Lake City, UT"} link={"#"}/>
        })}
    </ResponsiveGridDisplay>
</div>
<RecentPurchases>
  {new Array(7).fill().map((_,idx)=>{
    return <PurchaseReceipt key={idx} location={"Los Angeles, CA"} email="tb123@gmail.com" buyer="Trent Block" seller="Microsoft" logo="https://picsum.photos/400?random=0" date={new Date().toDateString()} items={[{"name":"Gaming Laptop", "quantity":"1", "cost":"375", "description":"A cool laptop!"}]}/>
  })}
  </RecentPurchases>
    </div>
  )
}

export default Profile