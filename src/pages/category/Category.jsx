import Footer from "../../components/common/footer/Footer";
import { styled } from "../../styles/globalStyles";

const CategoryContainer = styled("div", {
  padding: "20px",
  gap: "20px",
  backgroundColor: "var(--color-background)",
  color: "var(--color-font)",
  transition: "background-color 0.3s ease, color 0.3s ease",
});

const Title = styled("h1", {
  fontSize: "2rem",
  color: "var(--color-primary)",
});

//FIXME - Kategorien für die News hinzufügen (z. B. Sport, Politik, Wirtschaft, etc.)
const Category = () => {
  return (
    <CategoryContainer>
      <Title>Category</Title>
      <Footer />
    </CategoryContainer>
  );
};

export default Category;
