import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Stack, Text, Image, Progress, Stat, StatLabel, StatNumber, SimpleGrid } from "@chakra-ui/react";
import { FaBarcode, FaUtensils, FaBullseye, FaSearch } from "react-icons/fa";

const foodDatabase = [
  { name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  // Add more food items here
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foodLog, setFoodLog] = useState([]);
  const [calorieGoal, setCalorieGoal] = useState(2000);

  const handleSearch = () => {
    const food = foodDatabase.find((item) => item.name.toLowerCase() === searchQuery.toLowerCase());
    if (food) {
      setFoodLog([...foodLog, food]);
      setSearchQuery("");
    }
  };

  const totalCalories = foodLog.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = foodLog.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = foodLog.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = foodLog.reduce((sum, food) => sum + food.fat, 0);

  const caloriesRemaining = calorieGoal - totalCalories;
  const caloriePct = (totalCalories / calorieGoal) * 100;

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Nutrition Tracker
      </Heading>

      <Stack spacing={8}>
        <Box>
          <FormControl id="search">
            <FormLabel>Search Food</FormLabel>
            <Stack direction="row">
              <Input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter food name" />
              <Button colorScheme="blue" onClick={handleSearch} leftIcon={<FaSearch />}>
                Search
              </Button>
            </Stack>
          </FormControl>
          <Button mt={4} colorScheme="blue" onClick={handleSearch} leftIcon={<FaBarcode />}>
            Scan Barcode
          </Button>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Today's Food Log
          </Heading>
          {foodLog.map((food, index) => (
            <Box key={index} p={4} borderWidth={1} mb={4}>
              <Heading as="h3" size="md">
                {food.name}
              </Heading>
              <Text>Calories: {food.calories}</Text>
              <Text>Protein: {food.protein}g</Text>
              <Text>Carbs: {food.carbs}g</Text>
              <Text>Fat: {food.fat}g</Text>
            </Box>
          ))}
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Daily Summary
          </Heading>
          <SimpleGrid columns={2} spacing={8}>
            <Box>
              <Stat>
                <StatLabel>Calories Remaining</StatLabel>
                <StatNumber>{caloriesRemaining}</StatNumber>
              </Stat>
              <Progress value={caloriePct} />
            </Box>
            <Box>
              <Stat>
                <StatLabel>Total Protein</StatLabel>
                <StatNumber>{totalProtein}g</StatNumber>
              </Stat>
            </Box>
            <Box>
              <Stat>
                <StatLabel>Total Carbs</StatLabel>
                <StatNumber>{totalCarbs}g</StatNumber>
              </Stat>
            </Box>
            <Box>
              <Stat>
                <StatLabel>Total Fat</StatLabel>
                <StatNumber>{totalFat}g</StatNumber>
              </Stat>
            </Box>
          </SimpleGrid>
        </Box>

        <Box textAlign="center">
          <Heading as="h2" size="lg" mb={4}>
            Personalized Nutrition Advice
          </Heading>
          <Image src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZWF0aW5nJTIwaW5mb2dyYXBoaWN8ZW58MHx8fHwxNzEyMjQ3NDgwfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Healthy Eating" mb={4} />
          <Text>Based on your goals and food intake, here are some tips for healthier eating:</Text>
          <ul>
            <li>Increase your protein intake to support muscle growth</li>
            <li>Choose complex carbs over simple carbs for sustained energy</li>
            <li>Incorporate healthy fats like avocados and nuts</li>
            <li>Stay hydrated by drinking plenty of water throughout the day</li>
          </ul>
        </Box>
      </Stack>
    </Container>
  );
};

export default Index;
