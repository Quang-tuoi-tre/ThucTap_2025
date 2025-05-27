// import { useEffect, useState } from "react"
// import { productApi } from "../api/product.api"
// import { AutoComplete, Input, Spin } from "antd";
// import { useNavigate } from "react-router-dom";


// const { Search } = Input;

// interface Product {
//   name: string;
//   finalPrice: number;
//   image: string;
// }

// export const SearchItem: React.FC = () => {
//     const[loading, setLoading]=useState(false)
//     const [options, setOptions] = useState<{ value: string }[]>([]);
//     const token = localStorage.getItem("token") || ""
//     const [value, setValue] = useState("");
//    const [products, setProducts]=useState<Product[]>([])
//     const navigate = useNavigate()

//       useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const res = await productApi.getProduct(token);
//         const listProducts: Product[] = res.data.data.products || [];
//         setProducts(listProducts);
//       } catch (error) {
//         console.error("Lỗi lấy sản phẩm:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [token]);

//     const handleSearch = (inputValue: string) => {
//         setValue(inputValue)
//     if (!inputValue) {
//       setOptions([]);
//       return;
//     }
//     const filtered = products
//       .filter((p) =>
//         p.name.toLowerCase().startsWith(inputValue.toLowerCase())
//       )
//       .map((p) => ({ value: p.name }));
//     setOptions(filtered);
//   };

//   const onSelect = (selectedValue: string) => {
//     const trimmedValue= selectedValue.trim()
//     setValue(trimmedValue)
//     console.log("Bạn chọn sản phẩm:", selectedValue);
    
//     navigate(`/search/${encodeURIComponent(selectedValue)}`);
//   };
//    const onSearch1 = (searchValue: string) => {
//     if (searchValue.trim()) {
//       navigate(`/search/${encodeURIComponent(searchValue.trim())}`);
//     }
//   };

//   //maxWidth: 600, marginBottom:200

//     return(
//        <div style={{ padding: 20  }}>
//       {loading ? (
//         <Spin tip="Đang tải sản phẩm..." />
//       ) : (
//         <AutoComplete
//           options={options}
//           style={{ width: "100%"}}
//           onSelect={onSelect}
//           onSearch={handleSearch}
//           filterOption={false} 
//           value={value}
//         >
//           <Search
//            placeholder="Search product..."
//            enterButton
//            allowClear
//             size="large"
//             onSearch={onSearch1} 
//             onChange={(e) => handleSearch(e.target.value)}

//            />
//         </AutoComplete>
//       )}
//     </div>
//     )
// }
import React, { useEffect } from "react";
import { AutoComplete, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { searchStore } from "../views/Store/SearchStore ";

const { Search } = Input;

export const SearchItem: React.FC = observer(() => {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  useEffect(() => {
    searchStore.fetchProducts(token);
  }, [token]);

  const handleSearch = (value1: string) => {
    searchStore.setValue(value1);
  };

  const onSelect = (value2: string) => {
    const trimmedValue = value2.trim();
    searchStore.setValue(trimmedValue);
    console.log("Bạn chọn sản phẩm:", trimmedValue);
    navigate(`/search/${encodeURIComponent(trimmedValue)}`);
  };

  const onSearch = (searchValue: string) => {
    if (searchValue.trim()) {
      navigate(`/search/${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
   <div style={{ padding: 0 }}> {/* Loại bỏ padding thừa */}
  {searchStore.loading ? (
    <Spin tip="Đang tìm kiếm..." /> 
  ) : (
    <AutoComplete
      options={searchStore.options}
      style={{ width: "100%" }}
      onSelect={onSelect}
      onSearch={handleSearch}
      filterOption={false}
      value={searchStore.value}
    >
      <Search
        placeholder="Tìm kiếm sản phẩm..." 
        enterButton
        allowClear
        size="large"
        onSearch={onSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ borderRadius: '4px' }} /* Bo tròn nhẹ ô tìm kiếm */
      />
    </AutoComplete>
  )}
</div>
  );
});
