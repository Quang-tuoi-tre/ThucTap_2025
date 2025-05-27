import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Carousel, Image, Spin } from "antd";
import { bannerStore } from "../views/Store/BannerStore"; // Đảm bảo đường dẫn đúng
import { toJS } from "mobx";
import { useNavigate } from "react-router-dom"; // Giả sử bạn dùng React Router để điều hướng khi click banner

// Component cho banner nhỏ bên phải
interface SmallBannerProps {
  image: string;
  title?: string;
  link?: string; // Thêm thuộc tính link nếu banner có link
}

const SmallBanner: React.FC<SmallBannerProps> = ({ image, title, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="small-banner-item" onClick={handleClick}>
      <Image
        src={image}
        alt={title || "Small banner image"}
        width="100%"
        height={240} // Chiều cao này sẽ được ghi đè bởi CSS để làm nó responsive
        className="small-banner-image"
        preview={{ mask: null }}
      />
      {title && (
        <div className="small-banner-title-overlay">{title}</div>
      )}
    </div>
  );
};

export const BannerItem: React.FC = observer(() => {
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    bannerStore.fetchBanners(token);
  }, [token]);

  // Kiểm tra trạng thái loading
  if (bannerStore.fetching) {
    return (
        <Spin tip="Đang tải banner..." />
      
    );
  }

 

  // Logic để phân chia banners cho Carousel chính và 2 banner nhỏ
  const allBanners = toJS(bannerStore.banners); // Chuyển MobX observable sang JS Array

  let mainCarouselBanners: any[] = [];
  let sideBanners: any[] = [];

  if (allBanners.length >= 3) {
    mainCarouselBanners = allBanners.slice(0, allBanners.length - 2);
    sideBanners = allBanners.slice(allBanners.length - 2);
  } else {
    mainCarouselBanners = allBanners;
    sideBanners = []; 
  }

  return (
      <div className="banner-grid-container">
        <div className="main-carousel-wrapper">
          <Carousel autoplay autoplaySpeed={1000} className="carousel-container">
            {mainCarouselBanners.map(banner => (
              <div key={banner.id} className="carousel-slide-item">
                <Image
                  src={banner.image}
                  alt={banner.title || "Banner image"}
                  width="100%"
                  height={500} // Chiều cao này sẽ được ghi đè bởi CSS
                  className="carousel-image"
                  preview={{ mask: null }}
                />
                {banner.title && (
                  <div className="carousel-title-overlay">{banner.title}</div>
                )}
              </div>
            ))}
          </Carousel>
        </div>

        {sideBanners.length === 2 && (
          <div className="side-banners-wrapper">
            {sideBanners.map(banner => (
              <SmallBanner
                key={banner.id}
                image={banner.image}
                title={banner.title}
                link={banner.link} 
              />
            ))}
          </div>
        )}
      </div>
  );
});